import {Injectable} from '@angular/core';
import {ComponentFactory} from './component.factory';
import {TextComponent} from '../components/text.component';

@Injectable({
  providedIn: 'root'
})
export class TextFactory implements ComponentFactory {
  constructor() {

  }

  public create(data): TextComponent {
    return new TextComponent(data);
  }
}
