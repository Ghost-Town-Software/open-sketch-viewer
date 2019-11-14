import {BaseComponent} from './base-component.model';
import Konva from 'konva';

export class ShapeGroup extends BaseComponent {
  readonly _class: string = 'shapeGroup';

  constructor(payload) {
    super(payload);
  }

  render() {
    const styles = this.style.value();

    this.canvas = new Konva.Group({
      x: this.frame.x,
      y: this.frame.y,
      width: this.frame.width,
      height: this.frame.height,
    });

    this.layers.forEach(layer => {
      const shapePath = layer.render();

      if(styles.fill) {
        shapePath.fill(styles.fill);
      }

      this.canvas.add(shapePath);
    });

    this.canvas.cache();

    for (const key in styles) {
      if (!styles.hasOwnProperty(key)) {
        continue;
      }

      if (typeof this.canvas[key] !== 'undefined') {
        this.canvas[key](styles[key]);
      }
    }

    return this.canvas;
  }
}
