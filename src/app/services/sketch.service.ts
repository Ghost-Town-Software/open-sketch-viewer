import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {OvalComponent} from '../sketch/components/oval.component';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  renderers = {
    oval: OvalComponent
    // text: TextRenderer,
    // rectangle: RectangleRenderer,
  };

  private click$: Subject<{shape, attrs}> = new Subject();

  public getFactory(clazz) {
    if (clazz in this.renderers) {
      return new this.renderers[clazz]();
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
