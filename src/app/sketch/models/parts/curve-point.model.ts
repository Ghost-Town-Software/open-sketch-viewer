import {Point} from '../../../model/point.model';
import {PointUtil} from '../../utils/point.util';

export class CurvePoint {
  readonly _class: string = 'curvePoint';
  cornerRadius: number;
  curveFrom: Point;
  curveMode: number;
  curveTo: Point;
  hasCurveFrom: boolean;
  hasCurveTo: boolean;
  point: Point;

  constructor(payload: CurvePoint) {
    this.cornerRadius = payload.cornerRadius;
    this.curveFrom = PointUtil.toPoint(String(payload.curveFrom));
    this.curveMode = payload.curveMode;
    this.curveTo = PointUtil.toPoint(String(payload.curveTo));
    this.hasCurveFrom = payload.hasCurveFrom;
    this.hasCurveTo = payload.hasCurveTo;
    this.point = PointUtil.toPoint(String(payload.point));
  }
}
