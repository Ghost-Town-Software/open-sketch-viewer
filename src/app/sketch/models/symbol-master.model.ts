import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {Container} from 'konva/types/Container';
import {Shape} from 'konva/types/Shape';
import {Group} from 'konva/types/Group';

export class SymbolMaster extends BaseComponent {
  readonly _class: string = 'symbolMaster';

  symbolID: string;

  constructor(payload: SymbolMaster) {
    super(payload);

    this.symbolID = payload.symbolID;
  }

  render(): Group {
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
