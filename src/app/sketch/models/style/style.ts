import {Blur} from './blur.model';
import {BorderOptions} from './border-options.model';
import {GraphicsContextSettings} from './graphical-control-settings.model';
import {ColorControls} from './color-controls.model';
import {Fill} from './fill.model';
import {Border} from './border.model';
import {Shadow} from './shadow.model';
import {TextStyle} from './text-style.model';

export class Style {
  readonly _class: string = 'style';
  endMarketType: number;
  miterLimit: number;
  startMarkerType: number;
  windingRule: number;
  blur: Blur;
  borderOptions: BorderOptions;
  borders: Border[];
  colorControls: ColorControls;
  contextSettings: GraphicsContextSettings;
  fills: Fill[];
  innerShadows: any[];
  shadows: Shadow[];

  textStyle: TextStyle;

  constructor({
                endMarketType, miterLimit, startMarkerType, windingRule,
                blur, borderOptions, borders, colorControls, contextSettings,
                fills, innerShadows, shadows, textStyle
              }) {

    this.endMarketType = endMarketType;
    this.miterLimit = miterLimit;
    this.startMarkerType = startMarkerType;
    this.windingRule = windingRule;
    this.blur = new Blur(blur);
    this.borderOptions = new BorderOptions(borderOptions);
    this.borders = borders.map(border => new Border(border));
    this.colorControls = new ColorControls(colorControls);
    this.contextSettings = new GraphicsContextSettings(contextSettings);
    this.fills = fills.map(fill => new Fill(fill));
    this.shadows = shadows.map(shadow => new Shadow(shadow));

    if(textStyle) {
      this.textStyle = new TextStyle(textStyle);
    }

    this.innerShadows = innerShadows;
  }

  public thickness() {
    return this.borders.length > 0 ? this.borders[0].thickness : 0;
  }

  public value() {
    if(this.fills.length > 2) {
      console.warn('Element has more than 1 fill', this.fills);
    }

    if(this.borders.length > 2) {
      console.warn('Element has more than 1 border', this.borders);
    }

    if(this.shadows.length > 2) {
      console.warn('Element has more than 1 shadow', this.shadows);
    }

    const textStyle = this.textStyle ? this.textStyle.value() : {};

    return {
      ...(this.fills.length > 0 ? this.fills[0].value() : {}),
      ...(this.borders.length > 0 ? this.borders[0].value() : {}),
      ...(this.shadows.length > 0 ? this.shadows[0].value() : {}),
      ...this.contextSettings.value(),
      ...textStyle
    };
  }

  public css(): string {
    return null;
  }
}
