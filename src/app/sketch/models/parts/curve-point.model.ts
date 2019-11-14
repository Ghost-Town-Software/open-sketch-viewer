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

  constructor({cornerRadius, curveFrom, curveMode, curveTo, hasCurveFrom, hasCurveTo, point}) {
    this.cornerRadius = cornerRadius;
    this.curveFrom = PointUtil.toPoint(curveFrom);
    this.curveMode = curveMode;
    this.curveTo = PointUtil.toPoint(curveTo);
    this.hasCurveFrom = hasCurveFrom;
    this.hasCurveTo = hasCurveTo;
    this.point = PointUtil.toPoint(point);
  }
}
