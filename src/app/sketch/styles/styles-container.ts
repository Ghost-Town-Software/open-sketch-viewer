import {Style} from './style';
import {BorderStyle} from './border.style';
import {ShadowStyle} from './shadow.style';
import {FillStyle} from './fill.style';
import {GraphicsContextSettingsStyle} from './graphics-context-settings.style';

export class StylesContainer {

  private styles: Style[] = [];

  public applyStyles(style) {
    if (style.borders.length > 0) {
      const border = new BorderStyle();
      border.parseStyles(style.borders[0]);
      this.addStyle(border);
    }

    if (style.shadows.length > 0) {
      const shadow = new ShadowStyle();
      shadow.parseStyles(style.shadows[0]);
      this.addStyle(shadow);
    }

    if (style.fills.length > 0) {
      const fill = new FillStyle();
      fill.parseStyles(style.fills[0]);
      this.addStyle(fill);
    }

    if (style.contextSettings) {
      const opacity = new GraphicsContextSettingsStyle();
      opacity.parseStyles(style.contextSettings);
      this.addStyle(opacity);
    }
  }

  public addStyle(style: Style) {
    this.styles.push(style);
  }

  public getStyles() {
    let combinedStyles = {};
    for (const style of this.styles) {
      combinedStyles = {...combinedStyles, ...style.getStyles()};
    }
    return combinedStyles;
  }

  public getCss(): string {
    let css = '';

    for (const style of this.styles) {
      css += style.getCss();
    }

    return css;
  }

}