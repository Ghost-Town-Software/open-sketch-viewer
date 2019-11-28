import {GraphicsContextSettings} from './graphical-control-settings.model';
import {Color} from './color.model';

export class Shadow {
  readonly _class: string = 'shadow';
  isEnabled = false;
  blurRadius: number;
  offsetX: number;
  offsetY: number;
  spread: number;
  color: Color;
  contextSettings: GraphicsContextSettings;

  constructor({isEnabled, blurRadius, offsetX, offsetY, spread, color, contextSettings}) {
    this.isEnabled = !!isEnabled;
    this.blurRadius = blurRadius;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.spread = spread;
    this.color = new Color(color);
    this.contextSettings = new GraphicsContextSettings(contextSettings || {});
  }

  public value() {
    if (!this.isEnabled) {
      return {};
    }

    return {
      shadowColor: this.color.value(),
      shadowOffset: {
        x: this.offsetX,
        y: this.offsetY
      },
      shadowBlur: this.blurRadius
    };
  }

  public css(): string {
    if (!this.isEnabled) {
      return null;
    }

    let value = `${this.offsetX}px ${this.offsetY}px `;

    if (this.blurRadius !== 0) {
      value += `${this.blurRadius}px `;
    }

    if (this.spread !== 0) {
      value += `${this.spread}px `;
    }

    value = value.trim();

    return `box-shadow: ${value};\n`;
  }
}
