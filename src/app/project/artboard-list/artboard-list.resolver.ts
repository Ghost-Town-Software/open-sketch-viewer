import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {NewProjectService} from '../project.service';
import {ModelFactory} from '../../sketch/models/model-factory';

@Injectable({
  providedIn: 'root'
})
export class ArtboardListResolver implements Resolve<any> {

  public constructor(private project: NewProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const raw = this.project.getRawPage(route.params.pageId);
    // const page: any = ModelFactory.create(raw);
    //
    // this.project.setPage(page);

    return raw;
  }
}
