import Konva from 'konva';
import {Injectable} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {ProjectService} from '../../services/project.service';
import {Group} from 'konva/types/Group';

export class ShapeGroupComponent extends AbstractComponent {

  constructor(payload: any) {
    super(payload);


    console.log('shapeGroup');
    console.log(JSON.stringify(payload));
  }

  public render(): Group {
    const group = this.createBoundingRect();

    for(const layer of this.data.layers) {
      group.add(this.drawShape(layer));
    }

    return group;
  }

  private drawShape(layer) {
    const styles = this.applyStyles(this.data.style);

    const shape = new Konva.Shape({
      x: layer.frame.x,
      y: layer.frame.y,
      width: layer.frame.width,
      height: layer.frame.height,
      sceneFunc: (context, shape) => {
        for (let i = 0; i < layer.points.length; i++) {
          const path = layer.points[i];
          const point = this.toPoint(path.point);

          if(i === 0) {
            context.beginPath();
            context.moveTo(Math.round(point.x * layer.frame.width), Math.round(point.y * layer.frame.height));

            console.log('moveTo', Math.round(point.x * layer.frame.width), Math.round(point.y * layer.frame.height));
        } else {
            context.lineTo(Math.round(point.x * layer.frame.width), Math.round(point.y * layer.frame.height));
            console.log('lineTo', Math.round(point.x * layer.frame.width), Math.round(point.y * layer.frame.height));
          }
        }

        // Konva will apply styles from config
        context.fillStrokeShape(shape);
      },

      ...styles
    });

    return shape;
  }

  private toPoint(str) {
    const point = JSON.parse(str.replace('{', '[').replace('}', ']'));
    return {
      x: point[0],
      y: point[1]
    }
  }
}
