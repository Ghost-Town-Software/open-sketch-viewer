import {Style} from './style';
import {AbstractStyle} from './abstract.style';

export class GraphicsContextSettingsStyle extends AbstractStyle implements Style {
  styles: any = {
    isEnabled: true
  };

  parseStyles(styleObj: any): boolean {
    if (styleObj._class !== 'graphicsContextSettings') {
      return false;
    }

    this.styles = {
      isEnabled: styleObj.opacity !== 1,
      // globalCompositeOperation: 'source-over',
      opacity: styleObj.opacity,
    };

    // if(styleObj.blendMode === 0) {
    //   this.styles.globalCompositeOperation = 'destination-out';
    // }

    return true;
  }

  getCss(): string {
    if (!this.styles.isEnabled) {
      return '';
    }

    return `opacity: ${this.styles.opacity};\n`;
  }
}
