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

  constructor({elipseLength, from, gradientType, to, stops, noiseIndex, noiseIntensity, patternFillType, patternTileScale}, frame) {
    this.elipseLength = elipseLength;
    this.gradientType = gradientType;
    this.stops = stops.map(stop => new GradientStop(stop));
    this.noiseIndex = noiseIndex;
    this.noiseIntensity = noiseIntensity;
    this.patternFillType = patternFillType;
    this.patternTileScale = patternTileScale;
    this.to = this.toPoint(to, frame);
    this.from = this.toPoint(from, frame);
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

  private toPoint(p, frame) {
    const point = PointUtil.toPoint(p);

    if(frame) {
      return {
        x: frame.width * point.x,
        y: frame.height * point.y,
      };
    }

    return point;
  }

  css() {
    return null;
  }
}
