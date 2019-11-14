import {BaseComponent} from './base-component.model';
import Konva from 'konva';

export class Group extends BaseComponent {
  constructor(payload) {
    super(payload);
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      transformsEnabled: 'position',
    });

    this.layers.forEach(layer => {
      if(!layer) {
        console.warn('Not implemented yet', layer);
        return;
      }
      this.canvas.add(layer.render());
    });

    return this.canvas;
  }
}
