import {Injectable} from '@angular/core';
import {OvalRenderer} from '../renderers/oval.renderer';
import {Renderer} from '../renderers/renderer';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  renderers = {
    oval: new OvalRenderer()
  };

  public getFactory(clazz): Renderer {
    if (clazz in this.renderers) {
      return this.renderers[clazz];
    }

    return null;
  }
}
