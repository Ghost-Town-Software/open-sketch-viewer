import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {AttributedString} from './parts/attributed-string.model';
import {environment} from '../../../environments/environment';
import * as rasterizeHTML from 'rasterizehtml';

export class Text extends BaseComponent {
  readonly _class: string = 'text';

  attributedString: AttributedString;
  dontSynchroniseWithSymbol: boolean;
  glyphBounds: string;
  lineSpacingBehaviour: number;
  textBehaviour: number;
  editor;

  constructor(payload) {
    super(payload);

    this.attributedString = new AttributedString(payload.attributedString);
    this.dontSynchroniseWithSymbol = payload.dontSynchroniseWithSymbol;
    this.glyphBounds = payload.glyphBounds;
    this.lineSpacingBehaviour = payload.lineSpacingBehaviour;
    this.textBehaviour = payload.textBehaviour;
  }

  renderText() {
    const styles: any = this.style.value() || {};

    const content: HTMLElement = document.createElement('div');
    content.style.width = this.frame.width + 'px';
    content.style.height = this.frame.height + 'px';
    content.style.margin = '0';
    content.style.padding = '0';
    content.style.whiteSpace = 'pre-wrap';
    content.style.letterSpacing = 'normal';
    
    Object.assign(content.style, styles);

    this.attributedString.attributes.forEach(attribute => {
      const innerStyle = attribute.attributes.value();
      const value = this.attributedString.string.substr(attribute.location, attribute.length);
      const span: HTMLElement = document.createElement('span');
      span.innerText = value;

      Object.assign(span.style, innerStyle);

      content.appendChild(span);
    });

    const text: HTMLElement = document.getElementById('canvas-text-text');
    text.innerHTML = '';
    text.appendChild(content);

    const canvas: any = document.getElementById('canvas-text-canvas');
    canvas.style.width = this.frame.width + 'px';
    canvas.style.height = this.frame.height + 'px';
    canvas.style.display = 'block';

    const html = `<html><head><style>html,body {padding: 0; margin: 0;}</style></head><body>${text.innerHTML}</body></html>`;

    rasterizeHTML.drawHTML(html, canvas, {
      width: this.frame.width,
      height: this.frame.height,
    }).then((res) => {
      content.remove();
      text.innerHTML = '';

      this.canvas.add(new Konva.Image({
        x: 0,
        y: 0,
        width: this.frame.width,
        height: this.frame.height,
        transformsEnabled: 'position',
        image: res.image,
      }));

      res.image.remove();
      res = null;

      this.canvas.draw();

      if (environment.cache) {
        this.canvas.cache();
      }
    });
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      transformsEnabled: 'position',
    });

    this.renderText();

    return this.canvas;
  }
}
