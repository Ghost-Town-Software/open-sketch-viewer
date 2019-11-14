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

  public value() {
    if(this.alpha === 1) {
      return this.hex();
    }

    return this.rgba();
  }

  public rgba() {
    const red = Math.floor(this.red * 255);
    const green = Math.floor(this.green * 255);
    const blue = Math.floor(this.blue * 255);
    const alpha = this.alpha || 1;

    if(alpha === 1) {
      return `rgb(${red}, ${green}, ${blue})`;
    }

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  public hex() {
    const red = Math.floor(this.red * 255).toString(16);
    const green = Math.floor(this.green * 255).toString(16);
    const blue = Math.floor(this.blue * 255).toString(16);

    return `#${red}${green}${blue}`;
  }
}
