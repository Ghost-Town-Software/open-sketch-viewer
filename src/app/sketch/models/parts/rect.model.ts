export class Rect {
  readonly _class: string = 'rect';
  constrainProportions: boolean = false;
  height: number;
  width: number;
  x: number;
  y: number;

  constructor({constrainProportions, height, width, x, y}) {
    this.constrainProportions = constrainProportions;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }
}
