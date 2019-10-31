import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as JSZip from 'jszip';
import {map, mergeMap, reduce, switchMap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {EMPTY, from, noop, of} from 'rxjs';
import {FileType} from '../enums/file.type';
import {TypeResolver} from '../utils/type-resolver';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

  }

  public loadDefault() {
    return this.load('/assets/sketch/ekooltura-lp-2019-09-17.sketch');
  }

  public load(path: string) {
    return this.http.get(path, {
      observe: 'response',
      responseType: 'blob'
    })
      .pipe(
        switchMap((res) => this.loadZip(res)),
        mergeMap((res) => this.getFiles(res)),
        mergeMap((res) => this.resolveFile(res)),
        reduce(Object.assign, {}),
      );
  }

  private resolveFile(file) {
    return this.handlers[TypeResolver.resolveType(file.name)](file);
  }

  private resolveImage(file) {
    const extension = file.name.split('.').pop();

    return from(file.async('base64'))
      .pipe(
        map((content: string) =>
          this.createFileResponse(file.name, this.sanitizer.bypassSecurityTrustUrl('data:image/' + extension + ';base64,' + content))
        )
      );
  }

  private resolveJson(file) {
    return from(file.async('string'))
      .pipe(
        map((content: string) => this.createFileResponse(file.name, JSON.parse(content)))
      );
  }

  private createFileResponse(filename, content) {
    return {[filename]: content};
  }

  private loadZip(response) {
    return from(JSZip.loadAsync(response.body));
  }

  private getFiles(zip) {
    return of(...Object.values(zip.files));
  }

  private get handlers() {
    return {
      [FileType.IMAGE]: (file) => this.resolveImage(file),
      [FileType.JSON]: (file) => this.resolveJson(file),
      [FileType.PDF]: (file) => EMPTY,
      [FileType.UNKNOWN]: (file) => EMPTY,
    }
  }
}
