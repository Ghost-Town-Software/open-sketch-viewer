import {Point} from '../../../model/point.model';
import {GradientStop} from './gradient-stop.model';
import {PointUtil} from '../../utils/point.util';

export class Gradient {
  readonly _class: string = 'gradient';
  elipseLength: number;
  from: Point;
  gradientType: number;
  to: Point;
  stops: GradientStop[];
  noiseIndex: number;
  noiseIntensity: number;
  patternFillType: number;
  patternTileScale: number;

  constructor({elipseLength, from, gradientType, to, stops, noiseIndex, noiseIntensity, patternFillType, patternTileScale}) {
    this.elipseLength = elipseLength;
    this.from = PointUtil.toPoint(from);
    this.gradientType = gradientType;
    this.to = PointUtil.toPoint(to);
    this.stops = stops.map(stop => new GradientStop(stop));
    this.noiseIndex = noiseIndex;
    this.noiseIntensity = noiseIntensity;
    this.patternFillType = patternFillType;
    this.patternTileScale = patternTileScale;
  }
}
