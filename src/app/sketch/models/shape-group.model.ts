import {BaseComponent} from "./base-component.model";
import {ShapePath} from "./shape-path.model";

export class ShapeGroup extends BaseComponent {
  readonly _class: string = 'shapeGroup';
  layers: ShapePath[];

  constructor(payload) {
    super(payload);
  }
}
