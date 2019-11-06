import {Style} from './style';
import {BorderStyle} from './border.style';
import {ShadowStyle} from './shadow.style';

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
