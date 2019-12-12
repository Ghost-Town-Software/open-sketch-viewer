import {Injectable} from '@angular/core';
import {Project} from '../model/config.model';
import {Filesystem} from '../model/filesystem.model';
import {Page} from '../sketch/models/page.model';
import {Artboard} from '../sketch/models/artboard.model';
import {SymbolMaster} from '../sketch/models/symbol-master.model';
import {Document} from '../model/document.model';

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

  public getSymbolMaster(symbolId: string): SymbolMaster {
    const layers = this.symbol.layers.filter((layer: any) => layer.symbolID === symbolId);

    if(layers.length) {
      return layers[0] as SymbolMaster;
    }

    return null;
  }

  setArtboard(artboard: Artboard) {
    this.artboard = artboard;
  }

  getTextPath(id: string) {
    return this.filesystem.getText(id);
  }

  getPath(image: string) {
    return this.filesystem.getPath(image);
  }

  setProject(project: Project) {
    this.project = project;
  }

  getRawArtboard(pageId: string, artboardId: string) {
    const page = this.filesystem.getPage(pageId);

    return page.layers.filter(layer => layer.do_objectID === artboardId)[0];
  }

  getArtboards(page: Page): Artboard[] {
    return page.layers.filter((layer) => layer._class === 'artboard') as Artboard[];
  }

  getArtboardLayer(do_objectID: string) {
    if(!this.artboard) {
      return null;
    }
    return this.artboard.layers.find(layer => layer.do_objectID === do_objectID);
  }

  getRawPage(id: string): Page {
    return this.filesystem.getPage(id);
  }

  getPages(): Page[] {
    return this.filesystem.getPages();
  }

  private getDocument(): Document {
    return this.filesystem.getDocument();
  }

  setSymbolPage(symbol: Page) {
    this.symbol = symbol;
  }

  setFilesystem(filesystem: Filesystem) {
    this.filesystem = filesystem;
  }
}
