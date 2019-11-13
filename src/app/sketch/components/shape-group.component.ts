import Konva from 'konva';
import {Injectable} from '@angular/core';
import {AbstractComponent} from './abstract.component';
import {ProjectService} from '../../services/project.service';
import {Group} from 'konva/types/Group';

export class ShapeGroupComponent extends AbstractComponent {

  constructor(payload: any) {
    super(payload);
  }

  public render(): Group {
    const group = this.createBoundingRect();
    const styles = this.applyStyles(this.data.style);
    const layers = this.data.layers;

    // group.globalCompositeOperation('xor');

    for (const layer of layers) {
      const shape = this.drawShape(layer, styles);

      // shape.globalCompositeOperation('destination-out');

      group.add(shape);
    }

    return group;
  }

  private drawShape(layer, styles) {
    if(layer.do_objectID === '3C4F34DF-D755-4636-A7B0-667E39073B79') {
      console.log('styles', styles, this.data.style);
    }

    const shape = new Konva.Shape({
      x: layer.frame.x,
      y: layer.frame.y,
      width: layer.frame.width,
      height: layer.frame.height,
      ...styles,
      sceneFunc: (context, shape) => {
        for (let i = 0; i < layer.points.length; i++) {
          const path = layer.points[i];
          const point = this.toPoint(path.point);
          const from = this.toPoint(path.curveFrom);

          let nextPath = layer.points[0];
          if (i + 1 < layer.points.length) {
            nextPath = layer.points[i + 1];
          }

          const dest = this.toPoint(nextPath.point);
          const to = this.toPoint(nextPath.curveTo);

          if (i === 0) {
            context.beginPath();
            context.moveTo(Math.round(point.x * layer.frame.width), Math.round(point.y * layer.frame.height));
          }

          context.bezierCurveTo(
            Math.round(from.x * layer.frame.width), Math.round(from.y * layer.frame.height),
            Math.round(to.x * layer.frame.width), Math.round(to.y * layer.frame.height),
            Math.round(dest.x * layer.frame.width), Math.round(dest.y * layer.frame.height),
          );
        }


        // Konva will apply styles from config
        context.fillStrokeShape(shape);
      },
    });


    // const color = layer.style.colorControls;
    // if(color.isEnabled) {
    //   shape.cache();
    //   shape.filters([
    //     Konva.Filters.HSL,
    //     Konva.Filters.Brighten,
    //     Konva.Filters.Contrast
    //   ]);
    //
    //   shape.hue(parseFloat(color.hue));
    //   shape.saturation(this.saturation(color.saturation));
    //   shape.brightness(this.brightness(color.brightness));
    //   shape.contrast(this.contrast(color.contrast));
    // }

    return shape;
  }

  private toPoint(str) {
    const point = JSON.parse(str.replace('{', '[').replace('}', ']'));
    return {
      x: point[0],
      y: point[1]
    }
  }

  protected saturation(saturation) {
    return saturation * 2 - 1;
  }

  protected brightness(brightness) {
    return brightness * 2 - 1;
  }

  protected contrast(contrast) {
    return contrast * 200 - 100;
  }
}
