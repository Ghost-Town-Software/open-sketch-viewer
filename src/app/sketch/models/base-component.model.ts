import {Style} from './style/style';
import {Rect} from './parts/rect.model';
import {Group} from 'konva/types/Group';

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
  isClosed: boolean;

  protected constructor({do_objectID, name, isFlippedHorizontal, isFlippedVertical, frame, style, isClosed}) {
    this.do_objectID = do_objectID;
    this.name = name;
    this.isFlippedHorizontal = isFlippedHorizontal;
    this.isFlippedVertical = isFlippedVertical;
    this.isClosed = isClosed;
    this.frame = new Rect(frame);
    this.style = new Style(style);
  }

  abstract render();

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
