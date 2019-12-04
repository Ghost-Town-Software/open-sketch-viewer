import {Blur} from './blur.model';
import {BorderOptions} from './border-options.model';
import {GraphicsContextSettings} from './graphical-control-settings.model';
import {ColorControls} from './color-controls.model';
import {Fill} from './fill.model';
import {Border} from './border.model';
import {Shadow} from './shadow.model';
import {TextStyle} from './text-style.model';
import {Rect} from '../parts/rect.model';
import {
  BorderStyle,
  FillStyle,
  GradientStyle, GraphicContextStyle,
  KonvaStyle, ShadowStyle,
  TextStyle as KonvaTextStyle
} from '../../../model/konva.model';

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
  frame: Rect;

  constructor(payload: Style, frame: Rect) {

    this.endMarketType = payload.endMarketType;
    this.miterLimit = payload.miterLimit;
    this.startMarkerType = payload.startMarkerType;
    this.windingRule = payload.windingRule;
    this.blur = new Blur(payload.blur);
    this.borderOptions = new BorderOptions(payload.borderOptions);
    this.borders = payload.borders.map(border => new Border(border, frame));
    this.colorControls = new ColorControls(payload.colorControls);
    this.contextSettings = new GraphicsContextSettings(payload.contextSettings);
    this.fills = payload.fills.map(fill => new Fill(fill, frame));
    this.shadows = payload.shadows.map(shadow => new Shadow(shadow));
    this.frame = frame;

    if (payload.textStyle) {
      this.textStyle = new TextStyle(payload.textStyle);
    }

    this.innerShadows = payload.innerShadows;
  }

  public thickness() {
    return this.borders.length > 0 ? this.borders[0].thickness : 0;
  }

  public value(): KonvaStyle {
    if (this.fills.length > 2) {
      console.warn('Element has more than 1 fill', this.fills);
    }

    if (this.borders.length > 2) {
      console.warn('Element has more than 1 border', this.borders);
    }

    if (this.shadows.length > 2) {
      console.warn('Element has more than 1 shadow', this.shadows);
    }

    const textStyle: KonvaTextStyle = this.textStyle ? this.textStyle.value() : null;
    const fills: FillStyle | GradientStyle = this.fills.length > 0 ? this.fills[0].value() : null;
    const borders: BorderStyle = this.borders.length > 0 ? this.borders[0].value() : null;
    const shadows: ShadowStyle = this.shadows.length > 0 ? this.shadows[0].value() : null;
    const context: GraphicContextStyle = this.contextSettings.value();

    return {
      ...textStyle,
      ...fills,
      ...borders,
      ...shadows,
      ...context
    };
  }

  public css(): string {

    let css = '';

    if(this.borders.length > 0) {
      css += this.borders[0].css() + '\n';
    }

    if(this.shadows.length > 0) {
      css += this.shadows[0].css() + '\n';
    }

    return css;
  }
}
