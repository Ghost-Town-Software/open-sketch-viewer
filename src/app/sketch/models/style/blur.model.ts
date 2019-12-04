import {Point} from '../../../model/point.model';
import {PointUtil} from '../../utils/point.util';

export class Blur {
  readonly _class: string = 'blur';
  isEnabled = false;
  center: Point;
  motionAngle: number;
  radius: number;
  saturation: number;
  type: number;

  constructor(payload: Blur) {
    this.isEnabled = Boolean(payload.isEnabled);
    this.center = PointUtil.toPoint(String(payload.center));
    this.motionAngle = payload.motionAngle;
    this.radius = payload.radius;
    this.saturation = payload.saturation;
    this.type = payload.type;
  }
}
