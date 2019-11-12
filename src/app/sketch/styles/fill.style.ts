import {Style} from './style';
import {GradientStyle} from './gradient.style';
import {ColorStyle} from './color.style';

export class FillStyle implements Style {

  private isEnabled: boolean = false;
  private _gradient: GradientStyle;
  private _color: ColorStyle;

  get gradient(): GradientStyle {
    return this._gradient;
  }

  get color(): ColorStyle {
    return this._color;
  }

  styles: any;

  getCss(): string {
    if(!this.isEnabled) {
      return '';
    }
    const css = [this.color.getCss()];

    if(this._gradient) {
      css.push(this._gradient.getCss());
    }

    return css.join(';\n');
  }

  getStyles(): object {
    if(!this.isEnabled) {
      return {};
    }
    return {
      ...this._color.getStyles(),
      ...(this._gradient ? this._gradient.getStyles() : {})
    };
  }

  parseStyles(payload: any): boolean {

    if(payload._class !== 'fill') {
      console.error('Invalid fill style with class %s', payload._class);
      return false;
    }

    this.isEnabled = payload.isEnabled;
    this._color = new ColorStyle();
    this._color.parseStyles(payload.color);

    if(payload.gradients && payload.gradients.length > 0) {
      this._gradient = new GradientStyle();
      this._gradient.parseStyles(payload.gradients);
    }

    return true;
  }


}
