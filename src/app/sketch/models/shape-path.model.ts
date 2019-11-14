import {BaseComponent} from './base-component.model';
import {CurvePoint} from './parts/curve-point.model';
import {CurvePointRenderer} from '../renderers/curve-point.renderer';
import Konva from 'konva';

export class ShapePath extends BaseComponent {
  readonly _class: string = 'shapePath';
  pointRadiusBehaviour: number;
  points: CurvePoint[];

  renderer: CurvePointRenderer;

  constructor(payload) {
    super(payload);

    this.points = payload.points.map(point => new CurvePoint(point));
    this.pointRadiusBehaviour = payload.pointRadiusBehaviour;

    this.renderer = new CurvePointRenderer(this.points, this.frame);
  }

  render() {
    const styles: any = this.style.value();

    if(!styles.fill) {
      styles.fill = '#000';
    }

    const item = new Konva.Shape({
      x: this.frame.x,
      y: this.frame.y,
      width: this.frame.width,
      height: this.frame.height,
      globalCompositeOperation: 'xor',
      transformsEnabled: 'position',
      hitGraphEnabled: false,
      ...styles,

      sceneFunc: (context, shape) => {
        this.renderer.render(context, shape);
      },
    });

    return item;
  }
}
