export class Rect {
  readonly _class: string = 'rect';
  constrainProportions = false;
  height: number;
  width: number;
  x: number;
  y: number;

  constructor(payload: Rect) {
    this.constrainProportions = payload.constrainProportions;
    this.height = payload.height;
    this.width = payload.width;
    this.x = payload.x;
    this.y = payload.y;
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
