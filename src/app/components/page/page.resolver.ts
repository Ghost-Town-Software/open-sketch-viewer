import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectService} from '../../services/project.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageResolver implements Resolve<any> {

  public constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.projectService.getPage(route.params.id);
  }
}
