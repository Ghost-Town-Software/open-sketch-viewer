import {Injectable} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {OvalComponent} from '../components/oval.component';
import {ComponentFactory} from './component.factory';

@Injectable({
  providedIn: 'root'
})
export class OvalFactory implements ComponentFactory {
  constructor(public project: ProjectService) {

  }

  public create(payload: any): OvalComponent {
    return new OvalComponent(payload, this.project);
  }
}
