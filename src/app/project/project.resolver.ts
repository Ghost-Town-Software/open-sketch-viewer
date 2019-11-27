import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../services/app.service';
import {map, take} from 'rxjs/operators';
import {NewProjectService} from './project.service';

@Injectable()
export class ProjectResolver implements Resolve<any> {
  constructor(private app: AppService, private project: NewProjectService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.app.projects$.pipe(
      take(1),
      map(projects => {
        const project = projects.filter(project => project.id === route.params.id)[0];

        this.project.setProject(project);

        return project;
      })
    );
  }
}
