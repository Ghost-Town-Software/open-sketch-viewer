import {Style} from './style/style';
import {Rect} from './parts/rect.model';
import {Group} from 'konva/types/Group';
import {LayerService} from '../../services/layer.service';
import {getService} from '../../injector.static';

export abstract class BaseComponent {
  readonly _class: string = 'component';
  isFlippedHorizontal: boolean;
  isFlippedVertical: boolean;
  do_objectID: string;
  name: string;
  frame: Rect;
  style: Style;
  layers: BaseComponent[];
  canvas: Group;

  protected layerService: LayerService;

  protected constructor({do_objectID, name, isFlippedHorizontal, isFlippedVertical, frame, style, layers}) {
    this.do_objectID = do_objectID;
    this.name = name;
    this.isFlippedHorizontal = isFlippedHorizontal;
    this.isFlippedVertical = isFlippedVertical;
    this.frame = new Rect(frame);
    this.layers = layers;
    this.style = new Style(style || {}, this.frame);
    this.layerService = getService(LayerService);
  }

  abstract render();

  bindEvents(canvas) {
    canvas.on('click', (e: MouseEvent) => {
      this.layerService.attributeLayer$.next(this.do_objectID);
    });
  }

  getStyles(): string {
    return this.style.css();
  }

  flip(node) {
    if(this.isFlippedVertical) {
      node.transformsEnabled('all');

      node.scaleY(-1);
      node.offsetY(node.height());
    }

    if(this.isFlippedHorizontal) {
      node.transformsEnabled('all');

      node.scaleX(-1);
      node.offsetX(node.width());
    }
  }
}
