import Konva from 'konva';
import {Injectable, Injector} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {ProjectService} from '../../services/project.service';
import {Group} from 'konva/types/Group';

@Injectable({
  providedIn: 'root'
})
export class OvalComponent extends AbstractComponent {

  constructor(payload: any, public project: ProjectService) {
    super(payload);
  }

  public render(): Group {
    const group = this.createBoundingRect();

    for (let i = 0; i < this.data.points.length; i++) {
      const point1 = this.data.points[i];
      let point2 = this.data.points[0];

      if (i + 1 < this.data.points.length) {
        point2 = this.data.points[i + 1];
      }

      group.add(this.drawOval(point1, point2));
    }

    group.on('click', (e) => {
      console.log('group clicked');
    });

    return group;
  }

  private drawOval(point1, point2) {
    const control1 = JSON.parse(point1.curveFrom.replace('{', '[').replace('}', ']'));
    const control2 = JSON.parse(point2.curveTo.replace('{', '[').replace('}', ']'));
    const from = JSON.parse(point1.point.replace('{', '[').replace('}', ']'));
    const to = JSON.parse(point2.point.replace('{', '[').replace('}', ']'));

    const ovalStyles = this.applyStyles(this.data.style);

    return new Konva.Shape({
      x: 0,
      y: 0,
      width: this.data.frame.width,
      height: this.data.frame.height,
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
        context.fillStrokeShape(shape);
      },

      ...ovalStyles
    });
  }
}
