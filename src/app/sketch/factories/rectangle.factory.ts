import {Injectable} from '@angular/core';
import {ComponentFactory} from './component.factory';
import {RectangleComponent} from '../components/rectangle.component';

@Injectable({
  providedIn: 'root'
})
export class RectangleFactory implements ComponentFactory {
  constructor() {

  }

  public create(data): RectangleComponent {
    return new RectangleComponent(data);
  }
}