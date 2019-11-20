import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {AttributedString} from './parts/attributed-string.model';
import {environment} from '../../../environments/environment';

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
  }

  render() {
    this.canvas = new Konva.Group({
      x: this.frame.x,
      y: this.frame.y,
      width: this.frame.width,
      height: this.frame.height,
      transformsEnabled: 'position',
    });

    this.attributedString.attributes.forEach(attribute => {
      const innerStyle = attribute.attributes.value();
      const value = this.attributedString.string.substr(attribute.location, attribute.length);

      const text = new Konva.Text({
        x: 0,
        y: 0,
        width: this.frame.width,
        height: this.frame.height,
        hitGraphEnabled: false,
        transformsEnabled: 'position',
        text: value,
        ...this.style.value(),
        ...innerStyle,
      });

      this.canvas.add(text);
    });

    if (environment.cache) {
      this.canvas.cache();
    }

    return this.canvas;
  }
}
