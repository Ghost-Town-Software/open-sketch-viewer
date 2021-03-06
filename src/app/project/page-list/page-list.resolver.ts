import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {NewProjectService} from '../project.service';

@Injectable({
  providedIn: 'root'
})
export class PageListResolver implements Resolve<any> {

  constructor(private project: NewProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.project.getPages();
  }
}
