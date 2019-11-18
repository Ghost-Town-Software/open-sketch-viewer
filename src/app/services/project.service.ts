import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private state$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  public getState() {
    return this.state$.asObservable();
  }

  public getPages() {
    const document = this.getDocument();
    const pages = [];

    for (const page of document.pages) {
      pages.push(this.state$.value[page._ref + '.json']);
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
    if (kind in this.state$.value) {
      return this.state$.value[kind];
    }

    return null;
  }

  public getImage(path) {
    if (path in this.state$.value) {
      return this.state$.value[path];
    }

    return null;
  }

  public getArtboards(pageId: string) {
    const page = this.getPage(pageId);

    return page.layers.filter(layer => layer._class === 'artboard');
  }

  public getPage(id) {
    return this.state$.value[`pages/${id}.json`];
  }

  public getArtboard(pageId: string, artboardId: string) {
    const page = this.getPage(pageId);
    return page.layers.find(layer => layer.do_objectID === artboardId);
  }

  public getDocument() {
    return this.state$.value['document.json'];
  }

  public load(state) {
    this.state$.next(state);
  }
}
