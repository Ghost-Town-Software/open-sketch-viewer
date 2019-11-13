import {Blur} from "./blur.model";
import {Border} from "./border.style";
import {BorderOptions} from "./border-options.model";
import {GraphicsContextSettings} from "./graphical-control-settings.model";
import {ColorControls} from "./color-controls.model";
import {Fill} from "./fill.model";

export class StyleModel {
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
  shadows: any[];

  constructor({
                endMarketType, miterLimit, startMarkerType, windingRule,
                blur, borderOptions, borders, colorControls, contextSettings,
                fills, innerShadows, shadows
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

    this.innerShadows = innerShadows;
    this.shadows = shadows;
  }
}
