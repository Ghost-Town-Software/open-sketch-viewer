import {Injectable} from '@angular/core';
import {OvalRenderer} from '../renderers/oval.renderer';
import {Renderer} from '../renderers/renderer';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  renderers = {
    oval: new OvalRenderer()
  };

  private click$: Subject<{shape, attrs}> = new Subject();

  public getFactory(clazz): Renderer {
    if (clazz in this.renderers) {
      return this.renderers[clazz];
    }

    return null;
  }

  public click(shape, attrs) {
    this.click$.next({shape, attrs});
  }

  public getClickState() {
    return this.click$.asObservable();
  }
}
