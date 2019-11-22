import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private state;
  private fonts;

  constructor() {
  }


  public getSymbolMaster(symbolId) {
    const pages = this.getPages();
    const page = pages.find((p) => p.name === 'Symbols');

    for (const layer of page.layers) {
      if(layer.symbolID === symbolId) {
        return layer;
      }
    }

    return null;
  }

  public getPages() {
    const document = this.getDocument();
    const pages = [];

    for (const page of document.pages) {
      pages.push(this.state[page._ref + '.json']);
    }

    return pages;
  }

  public find(objectID) {
    const pages = this.getPages();

    for (const page of pages) {
      const value = findInNested(page);

      if (value) {
        return value;
      }
    }

    return null;

    function findInNested(object) {
      if (object.do_objectID === objectID) {
        return object;
      }

      if (!object.layers) {
        return null;
      }

      for (const layer of object.layers) {
        const value = findInNested(layer);

        if (value) {
          return value;
        }
      }

      return null;
    }
  }

  public getPreview() {
    return this.get('previews/preview.png');
  }

  public get(kind) {
    if (kind in this.state) {
      return this.state[kind];
    }

    return null;
  }

  public getImage(path) {
    if (path in this.state) {
      return this.state[path];
    }

    return null;
  }

  public getArtboards(pageId: string) {
    const page = this.getPage(pageId);

    return page.layers.filter(layer => layer._class === 'artboard');
  }

  public getPage(id) {
    return this.state[`pages/${id}.json`];
  }

  public getArtboard(pageId: string, artboardId: string) {
    const page = this.getPage(pageId);
    return page.layers.find(layer => layer.do_objectID === artboardId);
  }

  public getDocument() {
    return this.state['document.json'];
  }

  public load(state) {
    this.state = state;
  }
}

