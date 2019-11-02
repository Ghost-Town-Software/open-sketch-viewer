import {Renderer} from './renderer';
import Konva from 'konva';

export class OvalRenderer extends Renderer {
  public render(item) {
    const result = [];

    for (let i = 0; i < item.points.length; i++) {
      const point1 = item.points[i];
      let point2 = item.points[0];

      if (i + 1 < item.points.length) {
        point2 = item.points[i + 1];
      }

      result.push(this.drawOval(item, point1, point2));
    }

    return result;
  }

  private drawOval(item, point1, point2) {
    const control1 = JSON.parse(point1.curveFrom.replace('{', '[').replace('}', ']'));
    const control2 = JSON.parse(point2.curveTo.replace('{', '[').replace('}', ']'));
    const from = JSON.parse(point1.point.replace('{', '[').replace('}', ']'));
    const to = JSON.parse(point2.point.replace('{', '[').replace('}', ']'));

    const figure = new Konva.Shape({
      x: item.frame.x,
      y: item.frame.y,
      stroke: '#00D2FF',
      strokeWidth: 4,
      width: item.frame.width,
      height: item.frame.height,
      sceneFunc: (context, shape) => {
        context.beginPath();
        context.moveTo(
          from[0] * shape.getAttr('width'), from[1] * shape.getAttr('height')
        );

        context.bezierCurveTo(
          control1[0] * shape.getAttr('width'), control1[1] * shape.getAttr('height'),
          control2[0] * shape.getAttr('width'), control2[1] * shape.getAttr('height'),
          to[0] * shape.getAttr('width'), to[1] * shape.getAttr('height')
        );

        // Konva will apply styles from config
        context.fillStrokeShape(shape);
      }
    });

    this.applyStyles(figure, item.style);

    return figure;
  }
}
