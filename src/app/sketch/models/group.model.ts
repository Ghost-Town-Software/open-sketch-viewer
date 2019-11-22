import {BaseComponent} from './base-component.model';
import Konva from 'konva';

export class Group extends BaseComponent {
  constructor(payload) {
    super(payload);
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      ...this.style.value(),
      id: this.do_objectID,
      transformsEnabled: 'position',
    });

    this.layers.forEach(layer => {
      if(!layer) {
        console.warn('Not implemented yet', layer);
        return;
      }

      const item = layer.render();
      this.canvas.add(item);
    });

    this.flip(this.canvas);
    this.bindEvents(this.canvas);

    return this.canvas;
  }
}
