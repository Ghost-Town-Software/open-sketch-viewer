import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoaderService} from '../services/loader.service';
import {ProjectService} from '../services/project.service';
import {flatMap, map} from 'rxjs/operators';
import {ModelFactory} from '../sketch/models/model-factory';
import {FontUtil} from '../sketch/utils/font.util';
import WebFont from 'webfontloader';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<any> {
  constructor(private loader: LoaderService, private project: ProjectService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.loader.loadDefault()
      .pipe(
        map((model: any) => {
          model = this.resolveState(model);
          this.project.load(model);
          return model;
        }),
        flatMap((model) => {
          return this.loadFonts(model);
        })
      );
  }

  private loadFonts(model) {
    const fonts = model['meta.json'].fonts;
    const toLoad = {};

    fonts.map((font) => {
      return FontUtil.toFont(font);
    }).forEach((font) => {
      if(!toLoad.hasOwnProperty(font.family)) {
        toLoad[font.family] = [];
      }

      toLoad[font.family].push(font.weight);
    });


    const results = [];

    for(const key in toLoad) {
      if(!toLoad.hasOwnProperty(key)) {
        continue;
      }

      const weights = toLoad[key].join(',');
      results.push(`${key}:${weights}:latin-ext`);

      return new Observable(subscriber => {
        WebFont.load({
          google: {
            families: results
          },
          active() {
            console.log('Fonts loaded', results);
            subscriber.next(model);
            subscriber.complete();
          },
          inactive() {
            console.log('Fonts can\'t be loaded', results);
            subscriber.next(model);
            subscriber.complete();
          }
        });
      });
    }
  }

  private resolveState(model) {
    const document = model['document.json'];

    for (const page of document.pages) {
      model[page._ref + '.json'] = this.buildModel(model[page._ref + '.json']);
    }

    return model;
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
