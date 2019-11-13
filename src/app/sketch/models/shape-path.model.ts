import {BaseComponent} from "./base-component.model";
import {CurvePoint} from "./parts/curve-point.model";

export class ShapePath extends BaseComponent {
  readonly _class: string = 'shapePath';
  pointRadiusBehaviour: number;
  points: CurvePoint[];

  constructor(payload) {
    super(payload);

    this.points = payload.points.map(point => new CurvePoint(point));
    this.pointRadiusBehaviour = payload.pointRadiusBehaviour;
  }
}
