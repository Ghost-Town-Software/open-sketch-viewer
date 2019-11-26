import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {AttributedString} from './parts/attributed-string.model';
import {environment} from '../../../environments/environment';
import {getService} from '../../injector.static';
import {TextService} from '../../services/text.service';

export class Text extends BaseComponent {
  readonly _class: string = 'text';

  attributedString: AttributedString;
  dontSynchroniseWithSymbol: boolean;
  glyphBounds: string;
  lineSpacingBehaviour: number;
  textBehaviour: number;
  editor;

  private textService: TextService;

  constructor(payload) {
    super(payload);

    this.attributedString = new AttributedString(payload.attributedString);
    this.dontSynchroniseWithSymbol = payload.dontSynchroniseWithSymbol;
    this.glyphBounds = payload.glyphBounds;
    this.lineSpacingBehaviour = payload.lineSpacingBehaviour;
    this.textBehaviour = payload.textBehaviour;

    this.textService = getService(TextService);
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

    // console.log('html2canvas');
    // html2canvas(text, {
    //   canvas,
    //   width: this.frame.width,
    //   height: this.frame.height,
    //   windowWidth: this.frame.width,
    //   windowHeight: this.frame.height,
    //   removeContainer: false,
    // }).then(c => {
    //   console.log('looaded, converting to Konva.Image');
    //   Konva.Image.fromURL(c.toDataURL('png', 100), image => {
    //     console.log('append');
    //     image.setAttrs({
    //       x: 0,
    //       y: 0,
    //       width: this.frame.width,
    //       height: this.frame.height,
    //       transformsEnabled: 'position',
    //     });
    //
    //     this.canvas.add(image);
    //     this.canvas.draw();
    //
    //     if (environment.cache) {
    //       this.canvas.cache();
    //     }
    //   });
    // });
  }


  // renderText() {
  //   const styles: any = this.style.value() || {};
  //
  //   const content: HTMLElement = document.createElement('div');
  //   content.style.width = this.frame.width + 'px';
  //   content.style.height = this.frame.height + 'px';
  //   content.style.margin = '0';
  //   content.style.padding = '0';
  //   content.style.whiteSpace = 'pre-wrap';
  //   content.style.letterSpacing = 'normal';
  //
  //   Object.assign(content.style, styles);
  //
  //   this.attributedString.attributes.forEach(attribute => {
  //     const innerStyle = attribute.attributes.value();
  //     const value = this.attributedString.string.substr(attribute.location, attribute.length);
  //     const span: HTMLElement = document.createElement('span');
  //     span.innerText = value;
  //
  //     Object.assign(span.style, innerStyle);
  //
  //     content.appendChild(span);
  //   });
  //
  //   const text: HTMLElement = document.getElementById('canvas-text-text');
  //   text.innerHTML = '';
  //   text.appendChild(content);
  //
  //   const canvas: any = document.getElementById('canvas-text-canvas');
  //   canvas.style.width = this.frame.width + 'px';
  //   canvas.style.height = this.frame.height + 'px';
  //   canvas.style.display = 'block';
  //
  //   let fonts = '';
  //   if(this.textService.fonts) {
  //     for(const font of this.textService.fonts) {
  //       fonts += `<link href="https://fonts.googleapis.com/css?family=${font}&display=swap" rel="stylesheet">`;
  //     }
  //   }
  //
  //   // can't loadfonts in <head> because it triggers it more than 4k and browser can't handle it
  //   const html = `<html><head><style>html,body {padding: 0; margin: 0;}</style></head><body>${text.innerHTML}</body></html>`;
  //
  //   rasterizeHTML.drawHTML(html, canvas, {
  //     width: this.frame.width,
  //     height: this.frame.height,
  //     executeJs: true,
  //   }).then((res) => {
  //     content.remove();
  //     text.innerHTML = '';
  //
  //     this.canvas.add(new Konva.Image({
  //       x: 0,
  //       y: 0,
  //       width: this.frame.width,
  //       height: this.frame.height,
  //       transformsEnabled: 'position',
  //       image: res.image,
  //     }));
  //
  //     res.image.remove();
  //     res = null;
  //
  //     this.canvas.draw();
  //
  //     if (environment.cache) {
  //       this.canvas.cache();
  //     }
  //   });
  // }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      transformsEnabled: 'position',
    });

    this.renderText();

    return this.canvas;
  }
}
