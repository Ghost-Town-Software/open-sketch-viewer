import {GraphicsContextSettings} from './graphical-control-settings.model';
import {Color} from './color.model';
import {Rect} from '../parts/rect.model';
import {Gradient} from './gradient.model';
import {FillStyle, GradientStyle} from '../../../model/konva.model';
import {GradientStop} from './gradient-stop.model';

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

  constructor(payload: Fill, frame: Rect) {
    this.isEnabled = Boolean(payload.isEnabled);
    this.fillType = payload.fillType;
    this.color = new Color(payload.color);
    this.contextSettings = new GraphicsContextSettings(payload.contextSettings);
    this.gradient = new Gradient(payload.gradient, frame);
  }

  public value(): FillStyle | GradientStyle {
    if (!this.isEnabled) {
      return null;
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
