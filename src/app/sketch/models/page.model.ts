import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {environment} from '../../../environments/environment';

export class Page extends BaseComponent {
  readonly _class: string = 'page';

  constructor(payload) {
    super(payload);

  }

  render() {
    this.canvas = new Konva.Group({
      x: this.frame.x,
      y: this.frame.y,
      width: this.frame.width,
      height: this.frame.height,
      transformsEnabled: 'position',
      id: this.do_objectID,
    });

    for(const layer of this.layers) {
      this.canvas.add(layer.render());
    }

    if (environment.cache) {
      this.canvas.cache();
    }

    return this.canvas;
  }
}
