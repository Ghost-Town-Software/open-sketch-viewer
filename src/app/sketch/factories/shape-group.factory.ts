import {Injectable} from '@angular/core';
import {ComponentFactory} from './component.factory';
import {ShapeGroupComponent} from '../components/shape-group.component';

@Injectable({
  providedIn: 'root'
})
export class ShapeGroupFactory implements ComponentFactory {
  constructor() {

  }

  public create(payload: any): ShapeGroupComponent {
    return new ShapeGroupComponent(payload);
  }
}
