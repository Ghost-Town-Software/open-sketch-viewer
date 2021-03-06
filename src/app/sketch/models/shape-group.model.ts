import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {environment} from '../../../environments/environment';
import {KonvaStyle} from '../../model/konva.model';

export class ShapeGroup extends BaseComponent {
  readonly _class: string = 'shapeGroup';

  constructor(payload: ShapeGroup) {
    super(payload);
  }

  render() {
    const styles: KonvaStyle = this.style.value();
    this.canvas = new Konva.Group({
      ...this.frame,
      transformsEnabled: 'position',
      id: this.do_objectID,
    });

    this.layers.forEach(layer => {
      const shapePath = layer.render();

      shapePath.globalCompositeOperation('xor');

      for (const property in styles) {
        if (!styles.hasOwnProperty(property)) {
          continue;
        }

        if (typeof shapePath[property] === 'function') {
          shapePath[property](styles[property]);
        }
      }

      this.canvas.add(shapePath);
      this.bindEvents(shapePath);
    });

    this.flip(this.canvas);
    this.bindEvents(this.canvas);

    this.canvas.cache({offset: 2});

    for (const key in styles) {
      if (!styles.hasOwnProperty(key)) {
        continue;
      }

      if (typeof this.canvas[key] !== 'undefined') {
        this.canvas[key](styles[key]);
      }
    }

    if (environment.cache) {
      this.canvas.cache();
    }

    return this.canvas;
  }
}
