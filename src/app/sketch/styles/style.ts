
export interface Style {

  styles: any;

  getCss(): string;

  getStyles(): object;

  parseStyles(styleObj: any): boolean;

}
