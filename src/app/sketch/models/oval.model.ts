import {BaseComponent} from "./base-component.model";
import {CurvePoint} from "./parts/curve-point.model";

export class Oval extends BaseComponent {
  readonly _class: string = 'oval';
  pointRadiusBehaviour: number;
  points: CurvePoint[];

  constructor(payload) {
    super(payload);

    this.points = payload.points.map(point => new CurvePoint(point));
    this.pointRadiusBehaviour = payload.pointRadiusBehaviour;
  }
}
