import {GraphicsContextSettings} from './graphical-control-settings.model';
import {Color} from './color.model';
import {Rect} from '../parts/rect.model';
import {Gradient} from './gradient.model';

export class Fill {
  readonly _class: string = 'fill';
  isEnabled = false;
  // 0 = fill
  // 1 = gradient
  fillType: number;
  color: Color;
  contextSettings: GraphicsContextSettings;
  gradient: Gradient;
  frame: Rect;

  constructor({isEnabled, fillType, color, contextSettings, gradient}, frame) {
    this.isEnabled = !!isEnabled;
    this.fillType = fillType;
    this.color = new Color(color);
    this.contextSettings = new GraphicsContextSettings(contextSettings);
    this.gradient = new Gradient(gradient, frame);
  }

  public value() {
    if (!this.isEnabled) {
      return {};
    }

    if(this.fillType === 0) {
      return {
        fill: this.color.value()
      };
    }

    if(this.fillType === 1) {
      return this.gradient.value();
    }

    console.warn('Unsupported fill type', this.fillType);
  }
}
