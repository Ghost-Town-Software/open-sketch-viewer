import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../services/app.service';
import {map, take} from 'rxjs/operators';
import {NewProjectService} from './project.service';
import {Filesystem} from '../model/filesystem.model';
import {ModelFactory} from '../sketch/models/model-factory';
import {TextService} from '../services/text.service';

@Injectable()
export class ProjectResolver implements Resolve<any> {
  constructor(private app: AppService, private project: NewProjectService, private text: TextService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.app.projects$.pipe(
      take(1),
      map(projects => {
        const project = projects.filter(project => project.id === route.params.id)[0];
        const filesystem: Filesystem = new Filesystem(project.path);
        const pages = filesystem.getPages().filter(page => page.name === 'Symbols');
        let symbol = null;

        for(const page of pages) {
          symbol = ModelFactory.create(page);
        }

        this.project.setProject(project);
        this.project.setSymbolPage(symbol);
        this.project.setFilesystem(filesystem);

        // this.text.loadFonts(filesystem);
        return project;
      })
    );
  }
}
