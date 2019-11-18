import {BaseComponent} from './base-component.model';
import {CurvePoint} from './parts/curve-point.model';
import Konva from 'konva';
import {CurvePointRenderer} from '../renderers/curve-point.renderer';
import {environment} from '../../../environments/environment';

export class Oval extends BaseComponent {
  readonly _class: string = 'oval';
  pointRadiusBehaviour: number;
  points: CurvePoint[];

  renderer: CurvePointRenderer;

  constructor(payload) {
    super(payload);

    this.points = payload.points.map(point => new CurvePoint(point));
    this.pointRadiusBehaviour = payload.pointRadiusBehaviour;
    this.renderer = new CurvePointRenderer(this.points, this.frame, this.isClosed);
  }

  render() {
    this.canvas = new Konva.Group({
      x: this.frame.x,
      y: this.frame.y,
      width: this.frame.width,
      height: this.frame.height,
      transformsEnabled: 'position',
    });

    const element = new Konva.Shape({
      width: this.frame.width,
      height: this.frame.height,
      transformsEnabled: 'position',

      ...this.style.value(),

      sceneFunc: (context, shape) => {
        this.renderer.render(context, shape);
      },
    });

    this.canvas.add(element);

    this.flip(this.canvas);

    if (environment.cache) {
      this.canvas.cache();
    }

    return this.canvas;
  }
}
