import {GraphicsContextSettings} from "./graphical-control-settings.model";
import {Gradient} from "./gradient.model";
import {Color} from "./color.model";

export class Border {
  readonly _class: string = 'border';
  isEnabled: boolean = false;
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
}
