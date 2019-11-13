import {Point} from "../../../model/point.model";
import {PointUtil} from "../../utils/point.util";

export class Blur {
  readonly _class: string = 'blur';
  isEnabled: boolean = false;
  center: Point;
  motionAngle: number;
  radius: number;
  saturation: number;
  type: number;


  constructor({isEnabled, center, motionAngle, radius, saturation, type}) {
    this.isEnabled = !!isEnabled;
    this.center = PointUtil.toPoint(center);
    this.motionAngle = motionAngle;
    this.radius = radius;
    this.saturation = saturation;
    this.type = type;
  }
}
