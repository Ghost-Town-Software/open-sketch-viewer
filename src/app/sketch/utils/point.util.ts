import {Point} from '../../model/point.model';

export class PointUtil {
  public static toPoint(str): Point {
    const match = str.match(/([\-0-9e\+\.]+)/g);

    return {
      x: Number(match[0]),
      y: Number(match[1])
    };
  }
}
