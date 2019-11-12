import {Style} from './style';

export class ColorStyle implements Style {
  styles: any;

  getAlpha(): number {
    return this.styles ? this.styles.alpha : null;
  }

  getCss(): string {
    return '';
  }

  getHexColor(): string {
    return this.styles ? this.styles.hex : null;
  }

  getRgba(): string {
    return this.styles ? this.styles.rgba : null;
  }

  getStyles(): object {
    return {
      fill: this.getHexColor()
    };
  }

  parseStyles(styleObj: any): boolean {
    if(styleObj._class !== 'color') {
      return false;
    }

    this.styles = {
      alpha: styleObj.alpha,
      rgba: this.extractColor(styleObj),
      hex: this.extractHexColor(styleObj)
    };

    return true;
  }

  private extractColor(attributes) {

    const red = Math.floor(attributes.red * 255);
    const green = Math.floor(attributes.green * 255);
    const blue = Math.floor(attributes.blue * 255);
    const alpha = attributes.alpha || 1;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  private extractHexColor(attributes) {

    const red = Math.floor(attributes.red * 255).toString(16);
    const green = Math.floor(attributes.green * 255).toString(16);
    const blue = Math.floor(attributes.blue * 255).toString(16);

    return `#${red}${green}${blue}`;
  }

}
