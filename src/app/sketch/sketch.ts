import {Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sketch {
  renderers = {};

  private click$: Subject<{ shape, attrs }> = new Subject();

  constructor(private injector: Injector) {

  }

  public render(item) {
    if (item._class in this.renderers) {
      return new this.renderers[item._class]();
    }

    console.warn('Not supported element with class %s');

    return null;
  }

  public click(shape, attrs) {
    this.click$.next({shape, attrs});
  }

  public getClickState() {
    return this.click$.asObservable();
  }

}
