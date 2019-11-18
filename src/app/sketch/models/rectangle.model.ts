import {BaseComponent} from './base-component.model';
import {CurvePoint} from './parts/curve-point.model';
import Konva from 'konva';
import {environment} from '../../../environments/environment';

export class Rectangle extends BaseComponent {
  readonly _class: string = 'rectangle';
  pointRadiusBehaviour: number;
  points: CurvePoint[];

  constructor(payload) {
    super(payload);

    this.points = payload.points.map(point => new CurvePoint(point));
    this.pointRadiusBehaviour = payload.pointRadiusBehaviour;
  }

  render() {
    this.canvas = new Konva.Group({
      x: this.frame.x,
      y: this.frame.y,
      width: this.frame.width,
      height: this.frame.height,
      transformsEnabled: 'position',
    });

    console.log('rect frame', this.canvas.width(), this.canvas.height(), this.canvas.x(), this.canvas.y());

    const element = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.frame.width,
      height: this.frame.height,
      transformsEnabled: 'position',
      cornerRadius: this.points.map(p => p.cornerRadius),
      ...this.style.value()
    });

    this.canvas.add(element);

    if (environment.cache) {
      this.canvas.cache();
    }

    return this.canvas;
  }
}
