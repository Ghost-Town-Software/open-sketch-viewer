export class BorderOptions {
  readonly _class: string = 'borderOptions';
  isEnabled: boolean = false;
  dashPattern: any[];
  lineCapStyle: number;
  lineJoinStyle: number;

  constructor({isEnabled, dashPattern, lineCapStyle, lineJoinStyle}) {
    this.isEnabled = !!isEnabled;
    this.dashPattern = dashPattern;
    this.lineCapStyle = lineCapStyle;
    this.lineJoinStyle = lineJoinStyle;
  }
}
