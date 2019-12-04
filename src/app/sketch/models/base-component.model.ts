import {Style} from './style/style';
import {Rect} from './parts/rect.model';
import {Group} from 'konva/types/Group';
import {LayerService} from '../../services/layer.service';
import {getService} from '../../injector.static';
import {Container, ContainerConfig} from 'konva/types/Container';
import {Shape, ShapeConfig} from 'konva/types/Shape';
import {Node, NodeConfig} from 'konva/types/Node';
import {KonvaGroup, KonvaShape} from '../../model/konva.model';

export abstract class BaseComponent {
  readonly _class: string = 'component';
  isFlippedHorizontal: boolean;
  isFlippedVertical: boolean;
  do_objectID: string;
  name: string;
  frame: Rect;
  style?: Style;
  layers: BaseComponent[];
  canvas: KonvaGroup;

  protected layerService: LayerService;

  protected constructor(payload: BaseComponent) {
    this.do_objectID = payload.do_objectID;
    this.name = payload.name;
    this.isFlippedHorizontal = payload.isFlippedHorizontal;
    this.isFlippedVertical = payload.isFlippedVertical;
    this.frame = new Rect(payload.frame);
    this.layers = payload.layers;
    this.style = new Style(payload.style, this.frame);
    this.layerService = getService(LayerService);
  }

  abstract render(): KonvaGroup | KonvaShape;

  bindEvents(canvas: Node<NodeConfig>): void {
    // TODO add canvas type
    canvas.on('click', () => {
      this.layerService.attributeLayer$.next(this.do_objectID);
    });
  }

  getStyles(): string {
    return this.style.css();
  }

  flip(node: KonvaGroup | KonvaShape): void {
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
