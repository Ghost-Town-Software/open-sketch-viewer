import {GraphicsContextSettings} from "./graphical-control-settings.model";
import {Color} from "./color.model";

export class Fill {
  readonly _class: string = 'fill';
  isEnabled: boolean = false;
  fillType: number;
  color: Color;
  contextSettings: GraphicsContextSettings;

  constructor({isEnabled, fillType, color, contextSettings}) {
    this.isEnabled = !!isEnabled;
    this.fillType = fillType;
    this.color = new Color(color);
    this.contextSettings = new GraphicsContextSettings(contextSettings);
  }
}
