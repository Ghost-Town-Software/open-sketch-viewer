export interface Style {

  styles: any;

  getCss(): string;

  getStyles(): object;

  parseStyles(payload: any): boolean;

}
