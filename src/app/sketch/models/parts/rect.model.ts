export class Rect {
  readonly _class: string = 'rect';
  constrainProportions = false;
  height: number;
  width: number;
  x: number;
  y: number;

  constructor({constrainProportions, height, width, x, y}) {
    this.constrainProportions = constrainProportions;
    this.height = (height);
    this.width = (width);
    this.x = (x);
    this.y = (y);
  }

  round() {
    return {
      x: Math.round(this.x),
      y: Math.round(this.y),
      width: Math.round(this.width),
      height: Math.round(this.height),
    };
  }

  applyRound() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
  }
}
