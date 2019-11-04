import {Injectable} from '@angular/core';
import {OvalRenderer} from '../renderers/oval.renderer';
import {Renderer} from '../renderers/renderer';
import {Subject} from 'rxjs';
import {TextRenderer} from '../renderers/text.renderer';
import {RectangleRenderer} from '../renderers/rectangle.renderer';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  renderers = {
    oval: new OvalRenderer(),
    text: new TextRenderer(),
    rectangle: new RectangleRenderer()
  };

  private click$: Subject<{shape, attrs}> = new Subject();

  public getFactory(clazz): Renderer {
    if (clazz in this.renderers) {
      return this.renderers[clazz];
    }

    console.warn('Not supported element with class %s', clazz);

    return null;
  }

  public click(shape, attrs) {
    this.click$.next({shape, attrs});
  }

  public getClickState() {
    return this.click$.asObservable();
  }
}
