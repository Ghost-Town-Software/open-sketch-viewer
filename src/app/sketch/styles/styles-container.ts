import {Style} from './style';
import {BorderStyle} from './border.style';
import {ShadowStyle} from './shadow.style';
import {GradientStyle} from './gradient.style';

export class StylesContainer {

  private styles: Style[] = [];

  public applyStyles(style) {
    if(style.borders.length > 0) {
      const border = new BorderStyle();
      border.parseStyles(style.borders[0]);
      this.addStyle(border);
    }

    if(style.shadows.length > 0) {
      const shadow = new ShadowStyle();
      shadow.parseStyles(style.shadows[0]);
      this.addStyle(shadow);
    }

    if(style.fills.length > 0) {
      const fillsAttr = style.fills[0];
      if(fillsAttr.gradient.length > 0) {
        const gradient = new GradientStyle();
        gradient.parseStyles(fillsAttr.gradient[0]);
        this.addStyle(gradient);
      }
    }
  }

  public addStyle(style: Style) {
    this.styles.push(style);
  }

  public getStyles() {
    let combinedStyles = {};
    for(const style of this.styles) {
      combinedStyles = { ...combinedStyles, ...style.getStyles() };
    }
    return combinedStyles;
  }

  public getCss() {

  }

}
