import {Color} from './color.model';

export class GradientStop {
  readonly _class: string = 'gradientStop';
  position: number;
  color: Color;

  constructor(payload: GradientStop) {
    this.position = payload.position;
    this.color = new Color(payload.color);
  }

  value() {
    return [this.position, this.color.value()];
  }
}
