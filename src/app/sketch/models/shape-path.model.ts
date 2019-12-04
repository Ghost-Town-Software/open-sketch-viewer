import {BaseComponent} from './base-component.model';
import {CurvePoint} from './parts/curve-point.model';
import {CurvePointRenderer} from '../renderers/curve-point.renderer';
import Konva from 'konva';
import {Context} from 'konva/types/Context';
import {Shape} from 'konva/types/Shape';
import {Container} from 'konva/types/Container';

export class ShapePath extends BaseComponent {
  readonly _class: string = 'shapePath';
  pointRadiusBehaviour: number;
  points: CurvePoint[];
  isClosed: boolean;
  renderer: CurvePointRenderer;

  constructor(payload: ShapePath) {
    super(payload);

    this.points = payload.points.map(point => new CurvePoint(point));
    this.pointRadiusBehaviour = payload.pointRadiusBehaviour;
    this.isClosed = payload.isClosed;

    this.renderer = new CurvePointRenderer(this.points, this.frame, this.isClosed);
  }

  render(): Shape {
    const styles: any = this.style.value();

    const item = new Konva.Shape({
      ...this.frame,
      transformsEnabled: 'position',
      hitGraphEnabled: false,
      ...styles,

      sceneFunc: (context: Context, shape: Shape) => {
        this.renderer.render(context, shape);
      },
    });

    this.flip(item);

    return item;
  }
}
