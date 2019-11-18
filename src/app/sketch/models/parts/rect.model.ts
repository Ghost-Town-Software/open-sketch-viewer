export class Rect {
  readonly _class: string = 'rect';
  constrainProportions = false;
  height: number;
  width: number;
  x: number;
  y: number;

  constructor({constrainProportions, height, width, x, y}) {
    this.constrainProportions = constrainProportions;
    this.height = Math.round(height);
    this.width = Math.round(width);
    this.x = Math.round(x);
    this.y = Math.round(y);
  }
}
