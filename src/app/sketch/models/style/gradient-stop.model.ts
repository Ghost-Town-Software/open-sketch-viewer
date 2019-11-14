import {Color} from './color.model';

export class GradientStop {
  readonly _class: string = 'gradientStop';
  position: number;
  color: Color;

  constructor({position, color}) {
    this.position = position;
    this.color = new Color(color);
  }
}
