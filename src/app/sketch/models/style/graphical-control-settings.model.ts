export class GraphicsContextSettings {
  readonly _class: string = 'graphicsContextSettings';
  blendMode: number;
  opacity: number;

  constructor({blendMode, opacity}) {
    this.blendMode = blendMode;
    this.opacity = opacity;
  }
}
