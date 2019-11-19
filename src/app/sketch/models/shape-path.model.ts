import {BaseComponent} from './base-component.model';
import {CurvePoint} from './parts/curve-point.model';
import {CurvePointRenderer} from '../renderers/curve-point.renderer';
import Konva from 'konva';

export class ShapePath extends BaseComponent {
  readonly _class: string = 'shapePath';
  pointRadiusBehaviour: number;
  points: CurvePoint[];
  isClosed: boolean;

  renderer: CurvePointRenderer;

  constructor(payload) {
    super(payload);

    this.points = payload.points.map(point => new CurvePoint(point));
    this.pointRadiusBehaviour = payload.pointRadiusBehaviour;
    this.isClosed = payload.isClosed;

    this.renderer = new CurvePointRenderer(this.points, this.frame, this.isClosed);
  }

  render() {
    const styles: any = this.style.value();

    const item = new Konva.Shape({
      ...this.frame,
      transformsEnabled: 'position',
      hitGraphEnabled: false,
      ...styles,

      sceneFunc: (context, shape) => {
        this.renderer.render(context, shape);
      },
    });

    this.flip(item);

    return item;
  }
}
