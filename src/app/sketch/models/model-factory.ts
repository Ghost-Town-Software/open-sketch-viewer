import {Oval} from './oval.model';
import {ShapeGroup} from './shape-group.model';
import {ShapePath} from './shape-path.model';
import {Rectangle} from './rectangle.model';
import {Text} from './text.model';
import {Group} from './group.model';
import {Bitmap} from './bitmap.model';
import {SymbolInstance} from './symbol-instance.model';
import {Page} from './page.model';
import {SymbolMaster} from './symbol-master.model';
import {Artboard} from './artboard.model';

export class ModelFactory {

  public static create(component: any) {
    if(component && component.layers) {
      component.layers = component.layers.map(ModelFactory.create);
    }

    switch (component._class) {
      case 'page':
        return new Page(component);
      case 'artboard':
        return new Artboard(component);
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
      case 'bitmap':
        return new Bitmap(component);
      case 'symbolInstance':
        return new SymbolInstance(component);
      case 'symbolMaster':
        return new SymbolMaster(component);
    }

    return null;
  }
}
