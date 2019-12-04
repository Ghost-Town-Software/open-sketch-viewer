import {CurvePoint} from '../models/parts/curve-point.model';
import {Rect} from '../models/parts/rect.model';
import {Shape} from 'konva/types/Shape';
import {Context} from 'konva/types/Context';

export class CurvePointRenderer {
  constructor(private points: CurvePoint[], private frame: Rect, private isClosedPath: boolean) {
    if (!this.points || !this.points.length) {
      console.warn('No points found', this.points);
    }
  }

  public render(context: Context, shape: Shape): void {
    for (let i = 0; i < this.points.length; i++) {
      const current = this.points[i];
      const nextPath = i + 1 < this.points.length ? this.points[i + 1] : this.points[0];

      if (i === 0) {
        context.beginPath();
        context.moveTo(this.getRelativeWidth(current.point.x), this.getRelativeHeight(current.point.y));
      }

      if (!this.isClosedPath && this.points.length === i + 1) {
        continue;
      }

      if(current.curveMode === 1) {
        context.lineTo(this.getRelativeWidth(nextPath.point.x), this.getRelativeHeight(nextPath.point.y));
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

  private getRelativeWidth(percent: number): number {
    return (percent * this.frame.width);
  }

  private getRelativeHeight(percent: number): number {
    return (percent * this.frame.height);
  }
}
