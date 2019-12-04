import {GraphicContextStyle} from '../../../model/konva.model';

export class GraphicsContextSettings {
  readonly _class: string = 'graphicsContextSettings';
  blendMode: number;
  opacity: number;

  constructor(payload: GraphicsContextSettings) {
    this.blendMode = payload.blendMode;
    this.opacity = payload.opacity;
  }

  public value(): GraphicContextStyle {
    if(this.opacity === 1) {
      return null;
    }

    return {
      opacity: this.opacity
    };
  }
}
