import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {AttributedString} from './parts/attributed-string.model';
import {environment} from '../../../environments/environment';
import html2canvas from 'html2canvas';
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

    const content: HTMLElement = document.createElement('p');
    content.style.margin = '0';
    content.style.padding = '0';
    content.style.whiteSpace = 'pre-wrap';
    content.style.fontFamily = styles.fontFamily;
    content.style.fontWeight = styles.fontStyle;
    content.style.textAlign = styles.align;
    content.style.fontSize = styles.fontSize + 'px';
    content.style.lineHeight = styles.lineHeight;
    content.style.color = styles.color;
    content.style.letterSpacing = 'normal';

    this.attributedString.attributes.forEach(attribute => {
      const innerStyle = Object.assign(styles, attribute.attributes.value());
      const value = this.attributedString.string.substr(attribute.location, attribute.length);
      const align = attribute.attributes.paragraphStyle.getAlignment();

      const span: HTMLElement = document.createElement('span');
      span.style.fontFamily = innerStyle.fontFamily;
      span.style.fontWeight = innerStyle.fontStyle;
      span.style.textAlign = align;
      span.style.fontSize = innerStyle.fontSize + 'px';
      span.style.lineHeight = innerStyle.lineHeight;
      span.innerText = value;
      span.style.color = innerStyle.color;

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

  html2canvas(content) {
    html2canvas(content, {
      width: this.frame.width,
      height: this.frame.height,
      windowWidth: this.frame.width,
      windowHeight: this.frame.height,
      backgroundColor: 'rgba(0,0,0,0)'
    }).then(canvas => {
      wrapper.style.display = 'none';
      content.remove();

      Konva.Image.fromURL(canvas.toDataURL('image/png', 1), (image) => {
        canvas = null;

        image.setAttrs({
          x: 0,
          y: 0,
          width: this.frame.width,
          height: this.frame.height,
          transformsEnabled: 'position',
        });

        this.canvas.add(image);
        this.canvas.draw();

        if (environment.cache) {
          this.canvas.cache();
        }

      });
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
