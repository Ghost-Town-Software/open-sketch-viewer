import {BaseComponent} from './base-component.model';
import Konva from 'konva';

export class Artboard extends BaseComponent {
  readonly _class: string = 'artboard';

  constructor(payload) {
    super(payload);
  }

  render() {
    this.canvas = new Konva.Group({
      ...this.frame,
      transformsEnabled: 'position',
    });


    return this.canvas;
  }
}
