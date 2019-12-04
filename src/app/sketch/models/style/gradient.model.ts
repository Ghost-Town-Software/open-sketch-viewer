import {Point} from '../../../model/point.model';
import {GradientStop} from './gradient-stop.model';
import {PointUtil} from '../../utils/point.util';
import {Rect} from '../parts/rect.model';

export class Gradient {
  readonly _class: string = 'gradient';
  elipseLength: number;
  from: Point;
  // 0 is linear
  gradientType: number;
  to: Point;
  stops: GradientStop[];
  noiseIndex: number;
  noiseIntensity: number;
  patternFillType: number;
  patternTileScale: number;

  frame: Rect;

  constructor(payload: Gradient, frame: Rect) {
    this.elipseLength = payload.elipseLength;
    this.gradientType = payload.gradientType;
    this.stops = payload.stops.map(stop => new GradientStop(stop));
    this.noiseIndex = payload.noiseIndex;
    this.noiseIntensity = payload.noiseIntensity;
    this.patternFillType = payload.patternFillType;
    this.patternTileScale = payload.patternTileScale;
    this.to = this.toPoint(String(payload.to), frame);
    this.from = this.toPoint(String(payload.from), frame);
    this.frame = frame;
  }

  value() {
    if(this.gradientType === 0) {
      return {
        fillLinearGradientStartPoint: this.from,
        fillLinearGradientEndPoint: this.to,
        fillLinearGradientColorStops: this.stops.map(stop => stop.value()).reduce((a, b) => a.concat(b)),
        fillPriority: 'linear-gradient',
      };
    }

    console.warn('Gradient type unsupported', this.gradientType);
  }

  private toPoint(p: string, frame: Rect): Point {
    const point = PointUtil.toPoint(p);

    if(frame && point) {
      return {
        x: frame.width * point.x,
        y: frame.height * point.y,
      };
    }

    return point;
  }

  css(): any {
    return null;
  }
}
