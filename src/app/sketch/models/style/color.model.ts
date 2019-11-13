export class Color {
  readonly _class: string = 'color';
  alpha: number;
  blue: number;
  green: number;
  red: number;

  constructor({alpha, blue, green, red}) {
    this.alpha = alpha;
    this.blue = blue;
    this.green = green;
    this.red = red;
  }
}
