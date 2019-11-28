import {Injectable} from '@angular/core';
import {AppService} from '../services/app.service';
import {Project} from '../model/config.model';
import {Filesystem} from '../model/filesystem.model';
import {Page} from '../sketch/models/page.model';
import {TextService} from "../services/text.service";
import {FontUtil} from "../sketch/utils/font.util";getMeta

@Injectable()
export class NewProjectService {
  private project: Project;
  private filesystem: Filesystem;

  constructor(private app: AppService, private text: TextService) {

  }

  loadFonts() {
    const meta = this.filesystem.getMeta();
    const fonts = meta.fonts;
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
    }

    this.text.loadFonts(results);
  }

  setProject(project: Project) {
    this.project = project;
    this.filesystem = new Filesystem(project.path);
  }

  getArtboard(pageId, artboardId) {
    const page = this.filesystem.getPage(pageId);

    return page.layers.filter(layer => layer.do_objectID === artboardId)[0];
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
