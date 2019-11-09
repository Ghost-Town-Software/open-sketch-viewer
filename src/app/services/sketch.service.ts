import {Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs';
import {OvalFactory} from '../sketch/factories/oval.factory';
import {TextFactory} from '../sketch/factories/text.factory';
import {RectangleFactory} from '../sketch/factories/rectangle.factory';
import {ComponentFactory} from '../sketch/factories/component.factory';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  renderers: {[key: string]: any} = {
    oval: OvalFactory,
    text: TextFactory,
    rectangle: RectangleFactory
  };

  private click$: Subject<{shape, attrs}> = new Subject();

  constructor(private injector: Injector) {

  }

  public getFactory(clazz): ComponentFactory {
    if (clazz in this.renderers) {
      return this.injector.get(this.renderers[clazz]);
    }

    // console.warn('Not supported element with class %s', clazz);

    return null;
  }

  public click(shape, attrs) {
    this.click$.next({shape, attrs});
  }

  public getClickState() {
    return this.click$.asObservable();
  }
}
