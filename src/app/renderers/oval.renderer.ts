import {Renderer} from './renderer';
import Konva from 'konva';

export class OvalRenderer extends Renderer {
  public render(item) {

    const group = this.createBoundingRect(item);

    for (let i = 0; i < item.points.length; i++) {
      const point1 = item.points[i];
      let point2 = item.points[0];

      if (i + 1 < item.points.length) {
        point2 = item.points[i + 1];
      }

      group.add(this.drawOval(item, point1, point2));
    }

    group.on('click', (e) => {
      console.log('group clicked');
    });

    return group;
  }



  private drawOval(item, point1, point2) {
    const control1 = JSON.parse(point1.curveFrom.replace('{', '[').replace('}', ']'));
    const control2 = JSON.parse(point2.curveTo.replace('{', '[').replace('}', ']'));
    const from = JSON.parse(point1.point.replace('{', '[').replace('}', ']'));
    const to = JSON.parse(point2.point.replace('{', '[').replace('}', ']'));

    const figure = new Konva.Shape({
      x: 0,
      y: 0,
      width: item.frame.width,
      height: item.frame.height,
      sceneFunc: (context, shape) => {
        context.beginPath();
        context.moveTo(
          Math.round(from[0] * shape.getAttr('width')), Math.round(from[1] * shape.getAttr('height'))
        );

        context.bezierCurveTo(
          Math.round(control1[0] * shape.getAttr('width')), Math.round(control1[1] * shape.getAttr('height')),
          Math.round(control2[0] * shape.getAttr('width')), Math.round(control2[1] * shape.getAttr('height')),
          Math.round(to[0] * shape.getAttr('width')), Math.round(to[1] * shape.getAttr('height'))
        );

        // Konva will apply styles from config
        context.fillStrokeShape(figure);
      }
    });

    this.applyStyles(figure, item.style);

    return figure;
  }
}
