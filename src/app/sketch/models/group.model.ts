import {BaseComponent} from './base-component.model';
import Konva from 'konva';

export class Group extends BaseComponent {
  constructor(payload) {
    super(payload);
  }

  render() {
    if(this.do_objectID === '0126A803-B15F-46E1-B47A-B1AB8A00A186') {
      // this.frame.width = 35;
      // this.frame.height = 35;
      console.log('frame', this.frame);
    }
    this.canvas = new Konva.Group({
      ...this.frame,
      ...this.style.value(),
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
