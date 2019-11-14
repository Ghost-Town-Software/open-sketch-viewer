import {Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs';
import {OvalFactory} from '../sketch/factories/oval.factory';
import {TextFactory} from '../sketch/factories/text.factory';
import {RectangleFactory} from '../sketch/factories/rectangle.factory';
import {ComponentFactory} from '../sketch/factories/component.factory';
import {AbstractComponent} from '../sketch/components/abstract.component';
import {ShapeGroupFactory} from '../sketch/factories/shape-group.factory';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  renderers: { [key: string]: any } = {
    oval: OvalFactory,
    text: TextFactory,
    rectangle: RectangleFactory,
    shapeGroup: ShapeGroupFactory,
  };

  private click$: Subject<AbstractComponent> = new Subject();

  constructor(private injector: Injector) {

  }

  public getFactory(clazz): ComponentFactory {
    if (clazz in this.renderers) {
      return this.injector.get(this.renderers[clazz]);
    }

    // console.warn('Not supported element with class %s', clazz);

    return null;
  }

  public click(component: AbstractComponent) {
    this.click$.next(component);
  }

  public getClickState() {
    return this.click$.asObservable();
  }
}
