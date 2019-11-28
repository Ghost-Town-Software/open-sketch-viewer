import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {NewProjectService} from '../project.service';
import {ModelFactory} from "../../sketch/models/model-factory";

@Injectable({
  providedIn: 'root'
})
export class ArtboardResolver implements Resolve<any> {

  public constructor(private project: NewProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let artboard = this.project.getArtboard(route.params.pageId, route.params.artboardId);
    artboard = this.buildModel(artboard);
    this.project.loadFonts();

    return artboard;
  }

  private buildModel(payload) {
    // if(payload.do_objectID === '4E70F0A3-97F4-4BA9-ADD5-6F3008FAA118') {
    //   console.log(JSON.stringify(payload));
    // }
    const model = ModelFactory.create(payload);

    if(model && payload.layers) {
      model.layers = payload.layers.map((item) => this.buildModel(item));
    }

    return model;
  }
}
