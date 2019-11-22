import {BaseComponent} from './base-component.model';
import Konva from 'konva';

export class SymbolMaster extends BaseComponent {
  readonly _class: string = 'symbolMaster';

  symbolID: string;

  constructor(payload) {
    super(payload);

    this.symbolID = payload.symbolID;
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      ...this.style.value(),
      transformsEnabled: 'position',
      id: this.do_objectID,
    });

    this.layers.forEach(layer => {
      if(!layer) {
        console.warn('Not implemented yet', layer);
        return;
      }
      this.canvas.add(layer.render());
    });

    this.flip(this.canvas);
    this.bindEvents(this.canvas);

    return this.canvas;
  }
}
