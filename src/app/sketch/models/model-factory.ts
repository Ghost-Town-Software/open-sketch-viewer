import {Oval} from './oval.model';
import {ShapeGroup} from './shape-group.model';
import {ShapePath} from './shape-path.model';
import {Rectangle} from './rectangle.model';
import {Text} from './text.model';
import {Group} from './group.model';

export class ModelFactory {

  public static create(component) {
    switch (component._class) {
      case 'oval':
        return new Oval(component);
      case 'shapeGroup':
        return new ShapeGroup(component);
      case 'shapePath':
        return new ShapePath(component);
      case 'rectangle':
        return new Rectangle(component);
      case 'text':
        return new Text(component);
      case 'group':
        return new Group(component);
    }

    return null;
  }
}
