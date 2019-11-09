import {AbstractComponent} from '../components/abstract.component';

export interface ComponentFactory {
  create(): AbstractComponent;
}
