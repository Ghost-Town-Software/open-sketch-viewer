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

  public getPage(id) {
    return this.state$.value[`pages/${id}.json`];
  }

  public getDocument() {
    return this.state$.value['document.json'];
  }

  public load(state) {
    this.state$.next(state);
  }
}
