import Konva from 'konva';
import {AbstractComponent} from './abstract.component';
import {Group} from 'konva/types/Group';

export class ShapeGroupComponent extends AbstractComponent {

  constructor(payload: any) {
    super(payload);
  }

  public render(): Group {
    const group = this.createBoundingRect();
    const styles: any = this.applyStyles(this.data.style);
    const layers = this.data.layers;

    group.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: this.data.frame.width,
      height: this.data.frame.height,
      fill: '#fff', // any color
      globalCompositeOperation: 'destination-in'
    }));

    for (const layer of layers) {
      group.add(this.drawShape(layer, styles));
    }

    group.cache();

    if(styles.opacity) {
      group.opacity(styles.opacity);
    }

    return group;
  }

  private drawShape(layer, styles) {
    if(layer.do_objectID === '3C4F34DF-D755-4636-A7B0-667E39073B79') {
      console.log('styles', styles, this.data.style, {
        x: layer.frame.x,
        y: layer.frame.y,
        width: layer.frame.width,
        height: layer.frame.height,
        globalCompositeOperation: 'xor',
        fill: '#252525',
      });
    }

    const {fill} = styles;

    const shape = new Konva.Shape({
      x: layer.frame.x,
      y: layer.frame.y,
      width: layer.frame.width,
      height: layer.frame.height,
      globalCompositeOperation: 'xor',
      fill,
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
