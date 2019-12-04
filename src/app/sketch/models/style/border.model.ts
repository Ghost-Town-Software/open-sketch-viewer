import {GraphicsContextSettings} from './graphical-control-settings.model';
import {Gradient} from './gradient.model';
import {Color} from './color.model';
import {Rect} from '../parts/rect.model';
import {BorderStyle} from '../../../model/konva.model';

export class Border {
  readonly _class: string = 'border';
  isEnabled = false;
  fillType: number;
  color: Color;
  contextSettings: GraphicsContextSettings;
  gradient: Gradient;
  position: number;
  thickness: number;

  constructor(payload: Border, frame: Rect) {
    this.isEnabled = Boolean(payload.isEnabled);
    this.fillType = payload.fillType;
    this.color = new Color(payload.color);
    this.contextSettings = new GraphicsContextSettings(payload.contextSettings);
    this.gradient = new Gradient(payload.gradient, frame);
    this.position = payload.position;
    this.thickness = payload.thickness;
  }

  public value(): BorderStyle {
    if(!this.isEnabled) {
      return null;
    }

    return {
      strokeWidth: this.thickness,
      stroke: this.color.value(),
      hitStrokeWidth: this.thickness > 3 ? null : 0
    };
  }

  public css(): string {
    if (!this.isEnabled) {
      return null;
    }

    return `border: ${this.thickness}px solid ${this.color.rgba()};\n`;
  }
}
