import {Injectable} from '@angular/core';
import {AppService} from '../services/app.service';
import {Project} from '../model/config.model';
import {Filesystem} from '../model/filesystem.model';
import {Page} from '../sketch/models/page.model';
import {TextService} from '../services/text.service';
import {Artboard} from '../sketch/models/artboard.model';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class NewProjectService {
  private filesystem: Filesystem;
  private project: Project;
  private symbol: Page;
  private artboard: Artboard;

  constructor() {

  }

  public getProject() {
    return this.project;
  }

  public getSymbolMaster(symbolId): any {
    const layers = this.symbol.layers.filter((layer: any) => layer.symbolID === symbolId);

    if(layers.length) {
      return layers[0];
    }

    return null;
  }

  setArtboard(artboard: Artboard) {
    this.artboard = artboard;
  }

  getTextPath(id) {
    return this.filesystem.getText(id);
  }

  getPath(image) {
    return this.filesystem.getPath(image);
  }

  getImage(image) {
    const path = this.getPath(image);
    const content = fs.readFileSync(path);

    console.log('content', content.toString());
  }

  setProject(project: Project) {
    this.project = project;
  }

  getRawArtboard(pageId, artboardId) {
    const page = this.filesystem.getPage(pageId);

    return page.layers.filter(layer => layer.do_objectID === artboardId)[0];
  }

  getArtboards(page) {
    return page.layers.filter(layer => layer._class === 'artboard');
  }

  getRawPage(id): Page {
    return this.filesystem.getPage(id);
  }

  getPages(): Page[] {
    return this.filesystem.getPages();
  }

  private getDocument() {
    return this.filesystem.getDocument();
  }

  setSymbolPage(symbol: Page) {
    this.symbol = symbol;
  }

  setFilesystem(filesystem: Filesystem) {
    this.filesystem = filesystem;
  }
}
