export class Color {
  readonly _class: string = 'color';
  alpha: number;
  blue: number;
  green: number;
  red: number;

  constructor(payload: Color) {
    this.alpha = payload.alpha;
    this.blue = payload.blue;
    this.green = payload.green;
    this.red = payload.red;
  }

  public value(): string {
    if(this.alpha === 1) {
      return this.hex();
    }

    return this.rgba();
  }

  public rgba(): string {
    const red = Math.floor(this.red * 255);
    const green = Math.floor(this.green * 255);
    const blue = Math.floor(this.blue * 255);
    const alpha = this.alpha || 1;

    if(alpha === 1) {
      return `rgb(${red}, ${green}, ${blue})`;
    }

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  public hex(): string {
    const red = this.fixHex(Math.floor(this.red * 255).toString(16));
    const green = this.fixHex(Math.floor(this.green * 255).toString(16));
    const blue = this.fixHex(Math.floor(this.blue * 255).toString(16));

    return `#${red}${green}${blue}`;
  }

  private fixHex(hex: string): string {
    if (hex.length < 2) {
      return '0' + hex;
    }

    return hex;
  }
}
