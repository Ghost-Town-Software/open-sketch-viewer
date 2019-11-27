import {Injectable} from '@angular/core';
import {AppService} from '../services/app.service';
import {Project} from '../model/config.model';
import {Filesystem} from '../model/filesystem.model';
import {Page} from '../sketch/models/page.model';

@Injectable()
export class NewProjectService {
  private project: Project;
  private filesystem: Filesystem;

  constructor(private app: AppService) {

  }

  setProject(project: Project) {
    this.project = project;
    this.filesystem = new Filesystem(project.path);
  }

  getArtboard(id) {
  }

  getArtboards(page) {
    return page.layers.filter(layer => layer._class === 'artboard');
  }

  getPage(id): Page {
    return this.filesystem.getPage(id);
  }

  getPages(): Page[] {
    return this.filesystem.getPages();
  }

  private getDocument() {
    return this.filesystem.getDocument();
  }
}
