import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {LoaderService} from "../services/loader.service";
import {ProjectService} from "../services/project.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<any> {
  constructor(private loader: LoaderService, private project: ProjectService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.loader.loadDefault()
      .pipe(
        map(state => {
          this.project.load(state);
          return state;
        })
      );
  }
}
