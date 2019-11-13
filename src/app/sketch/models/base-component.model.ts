import {StyleModel} from "./style/style.model";
import {Oval} from "./oval.model";
import {Rect} from "./parts/rect.model";
import {ShapeGroup} from "./shape-group.model";
import {ShapePath} from "./shape-path.model";

export abstract class BaseComponent {
  readonly _class: string = 'component';
  do_objectID: string;
  name: string;
  frame: Rect;
  style: StyleModel;
  layers: BaseComponent[];

  protected constructor({do_objectID, name, frame, style, layers}) {
    this.do_objectID = do_objectID;
    this.name = name;
    this.frame = new Rect(frame);
    this.style = new StyleModel(style);

    this.layers = layers.map(layer => {
      return BaseComponent.createComponent(layer);
    });
  }

  public static createComponent(component: BaseComponent): BaseComponent {
    switch(component._class) {
      case 'oval':
        return new Oval(component);
      case 'shapeGroup':
        return new ShapeGroup(component);
      case 'shapePath':
        return new ShapePath(component);
    }

    return null;
  }
}
