import {StyleModel} from './style/style.model';
import {Rect} from './parts/rect.model';
import {Group} from 'konva/types/Group';

export abstract class BaseComponent {
  readonly _class: string = 'component';
  do_objectID: string;
  name: string;
  frame: Rect;
  style: StyleModel;
  layers: BaseComponent[];

  canvas: Group;

  protected constructor({do_objectID, name, frame, style}) {
    this.do_objectID = do_objectID;
    this.name = name;
    this.frame = new Rect(frame);
    this.style = new StyleModel(style);
  }

  abstract render();
}
