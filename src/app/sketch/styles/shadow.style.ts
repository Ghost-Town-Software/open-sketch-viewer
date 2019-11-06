import {Style} from './style';
import {ColorUtils} from './color-utils';
import {ColorStyle} from './color.style';
import {style} from '@angular/animations';

export class ShadowStyle implements Style {

  styles: any = {
    isEnabled: false
  };

  color: ColorStyle;

  parseStyles(styleObj: any): boolean {
    if(styleObj._class !== 'shadow') {
      return false;
    }

    this.color = new ColorStyle();
    this.color.parseStyles(styleObj.color);

    this.styles = {
      isEnabled: styleObj.isEnabled,
      opacity: styleObj.color.alpha,
      offset: {
        x: styleObj.offsetX,
        y: styleObj.offsetY
      },
      blur: styleObj.blurRadius
    };

    return true;
  }

  getCss(): string {
    if (!this.styles.isEnabled) {
      return '';
    }
    return `box-shadow: ${this.styles.offset.x}px ${this.styles.offset.y}px ${this.styles.blur}px ${this.color.getRgba()} `;
  }

  getStyles(): object {
    if(!this.styles.isEnabled) {
      return {};
    }
    return this.styles;
  }

}
