import {Injectable} from '@angular/core';
import {LoaderService} from "./loader.service";
import {BehaviorSubject, Subscription} from "rxjs";

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

  public load(state) {
    this.state$.next(state);
  }
}
