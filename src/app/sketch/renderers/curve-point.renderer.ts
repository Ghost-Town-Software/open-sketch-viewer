import {CurvePoint} from '../models/parts/curve-point.model';
import {Rect} from '../models/parts/rect.model';

export class CurvePointRenderer {
  constructor(private points: CurvePoint[], private frame: Rect, private isClosedPath) {
    if (!this.points || !this.points.length) {
      console.warn('No points found', this.points);
    }
  }

  public render(context, shape) {
    for (let i = 0; i < this.points.length; i++) {
      const current = this.points[i];
      const nextPath = i + 1 < this.points.length ? this.points[i + 1] : this.points[0];

      // if (!this.isClosedPath && this.points.length === i + 1) {
      //   continue;
      // }

      if (i === 0) {
        context.beginPath();
        context.moveTo(this.getRelativeWidth(current.point.x), this.getRelativeHeight(current.point.y));
      }

      if(current.curveMode === 1) {
        context.lineTo(this.getRelativeWidth(current.point.x), this.getRelativeHeight(current.point.y));
      } else {
        context.bezierCurveTo(
          this.getRelativeWidth(current.curveFrom.x), this.getRelativeHeight(current.curveFrom.y),
          this.getRelativeWidth(nextPath.curveTo.x), this.getRelativeHeight(nextPath.curveTo.y),
          this.getRelativeWidth(nextPath.point.x), this.getRelativeHeight(nextPath.point.y),
        );
      }
    }

    if (this.isClosedPath) {
      context.closePath();
    }

    context.fillStrokeShape(shape);
  }

  private getRelativeWidth(percent) {
    return Math.round(percent * this.frame.width);
  }

  private getRelativeHeight(percent) {
    return Math.round(percent * this.frame.height);
  }
}
