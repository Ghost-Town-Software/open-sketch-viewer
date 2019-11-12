import {Style} from './style';
import {ColorStyle} from './color.style';
import {AbstractStyle} from './abstract.style';

export class BorderStyle extends AbstractStyle implements Style {

  styles: any = {
    isEnabled: false,
    strokeWidth: null,
    stroke: null
  };

  color: ColorStyle;

  parseStyles(styleObj: any): boolean {
    if(styleObj._class !== 'border') {
      return false;
    }

    this.color = new ColorStyle();
    this.color.parseStyles(styleObj.color);

    this.styles = {
      isEnabled: styleObj.isEnabled,
      strokeWidth: styleObj.thickness,
      stroke: this.color.getRgba()
    };

    return true;
  }

  getCss(): string {
    if(!this.styles.isEnabled) {
      return '';
    }

    return `border: ${this.styles.strokeWidth}px solid ${this.styles.stroke};\n`;
  }

}
