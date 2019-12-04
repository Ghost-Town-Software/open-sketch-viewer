import {GraphicsContextSettings} from './graphical-control-settings.model';
import {Color} from './color.model';
import {ShadowStyle} from '../../../model/konva.model';

export class Shadow {
  readonly _class: string = 'shadow';
  isEnabled = false;
  blurRadius: number;
  offsetX: number;
  offsetY: number;
  spread: number;
  color: Color;
  contextSettings: GraphicsContextSettings;

  constructor(payload: Shadow) {
    this.isEnabled = Boolean(payload.isEnabled);
    this.blurRadius = payload.blurRadius;
    this.offsetX = payload.offsetX;
    this.offsetY = payload.offsetY;
    this.spread = payload.spread;
    this.color = new Color(payload.color);
    this.contextSettings = new GraphicsContextSettings(payload.contextSettings);
  }

  public value(): ShadowStyle {
    if (!this.isEnabled) {
      return null;
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
