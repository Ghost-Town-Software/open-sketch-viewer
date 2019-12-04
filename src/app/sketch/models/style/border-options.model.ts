export class BorderOptions {
  readonly _class: string = 'borderOptions';
  isEnabled = false;
  dashPattern: any[];
  lineCapStyle: number;
  lineJoinStyle: number;

  constructor(payload: BorderOptions) {
    this.isEnabled = Boolean(payload.isEnabled);
    this.dashPattern = payload.dashPattern;
    this.lineCapStyle = payload.lineCapStyle;
    this.lineJoinStyle = payload.lineJoinStyle;
  }
}
