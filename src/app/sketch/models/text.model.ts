import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {AttributedString} from './parts/attributed-string.model';

import html2canvas from 'html2canvas';

export class Text extends BaseComponent {
  readonly _class: string = 'text';

  attributedString: AttributedString;
  dontSynchroniseWithSymbol: boolean;
  glyphBounds: string;
  lineSpacingBehaviour: number;
  textBehaviour: number;

  constructor(payload) {
    super(payload);

    this.attributedString = new AttributedString(payload.attributedString);
    this.dontSynchroniseWithSymbol = payload.dontSynchroniseWithSymbol;
    this.glyphBounds = payload.glyphBounds;
    this.lineSpacingBehaviour = payload.lineSpacingBehaviour;
    this.textBehaviour = payload.textBehaviour;

    console.log('html2canvas', html2canvas);
  }

  render() {
    this.canvas = new Konva.Group({
      x: this.frame.x,
      y: this.frame.y,
      width: this.frame.width,
      height: this.frame.height,
    });

    this.attributedString.attributes.forEach(attribute => {
      const innerStyle = attribute.attributes.value();
      const value = this.attributedString.string.substr(attribute.location, attribute.length);

      const text = new Konva.Text({
        text: value,
        ...innerStyle
      });

      console.log(text.width(), text.height(), value);

      this.canvas.add(text);
    });


      // this.createText();
    // this.canvas.add(element);

    return this.canvas;
  }

  createText() {
    const textStyle = this.style.textStyle.value();

    const span = document.createElement('span');
    span.style.whiteSpace = 'pre-wrap';

    for(const key in textStyle) {
      if(!textStyle.hasOwnProperty(key)) {
        continue;
      }

      span.style[key] = textStyle[key];
    }

    this.attributedString.attributes.forEach(attribute => {
      const innerStyle = attribute.attributes.value();
      const value = this.attributedString.string.substr(attribute.location, attribute.length);

      const inner = document.createElement('span');
      inner.innerText = value;

      for(const key in innerStyle) {
        if(!innerStyle.hasOwnProperty(key)) {
          continue;
        }

        inner.style[key] = innerStyle[key];
      }

      span.appendChild(inner);
    });

    document.body.appendChild(span);

    html2canvas(span, {
      backgroundColor: 'rgba(0,0,0,0)'
    }).then(canvas => {
      const image = new Konva.Image({
        width: this.frame.width,
        height: this.frame.height,
        image: canvas
      });

      this.canvas.add(image);

      document.body.removeChild(span);
    });
  }

  lineHeight() {
  }
}
