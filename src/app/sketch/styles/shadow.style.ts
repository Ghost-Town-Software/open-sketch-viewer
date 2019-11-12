import {Style} from './style';
import {ColorStyle} from './color.style';
import {AbstractStyle} from './abstract.style';

export class ShadowStyle extends AbstractStyle implements Style {

  styles: any = {
    isEnabled: false
  };

  color: ColorStyle;

  parseStyles(styleObj: any): boolean {
    if (styleObj._class !== 'shadow') {
      return false;
    }

    this.color = new ColorStyle();
    this.color.parseStyles(styleObj.color);

    this.styles = {
      isEnabled: styleObj.isEnabled,
      shadowColor: this.color.getRgba(),
      shadowOffset: {
        x: styleObj.offsetX,
        y: styleObj.offsetY
      },
      shadowBlur: styleObj.blurRadius
    };

    return true;
  }

  getCss(): string {
    if (!this.styles.isEnabled) {
      return '';
    }
    return `box-shadow: ${this.styles.shadowOffset.x}px ${this.styles.shadowOffset.y}px `
      + `${this.styles.shadowBlur}px ${this.color.getRgba()};\n`;
  }

}
