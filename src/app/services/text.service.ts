import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private fontLoader$ = new BehaviorSubject(null);
  textRender$ = new BehaviorSubject(null);
  fonts = null;

  loadFont(font) {
    this.fonts = font;
    this.fontLoader$.next(font);
  }

  renderText(callback) {
    this.textRender$.next(callback);
  }

  fontLoader() {
    return this.fontLoader$.asObservable();
  }
}
