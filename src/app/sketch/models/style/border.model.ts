import {GraphicsContextSettings} from './graphical-control-settings.model';
import {Gradient} from './gradient.model';
import {Color} from './color.model';

export class Border {
  readonly _class: string = 'border';
  isEnabled = false;
  fillType: number;
  color: Color;
  contextSettings: GraphicsContextSettings;
  gradient: Gradient;
  position: number;
  thickness: number;

  constructor({isEnabled, fillType, color, contextSettings, gradient, position, thickness}) {
    this.isEnabled = !!isEnabled;
    this.fillType = fillType;
    this.color = new Color(color);
    this.contextSettings = new GraphicsContextSettings(contextSettings);
    this.gradient = new Gradient(gradient);
    this.position = position;
    this.thickness = thickness;
  }

  public value() {
    if(!this.isEnabled) {
      return {};
    }

    return {
      strokeWidth: this.thickness,
      stroke: this.color.rgba(),
      hitStrokeWidth: this.thickness > 3
    };
  }

  public css(): string {
    if (!this.isEnabled) {
      return null;
    }

    return `border: ${this.thickness}px solid ${this.color.rgba()};\n`;
  }
}
