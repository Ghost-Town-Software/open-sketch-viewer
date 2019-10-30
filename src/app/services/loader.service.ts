import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as JSZip from 'jszip';
import {map, mergeMap, reduce, switchMap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {EMPTY, from, of} from 'rxjs';

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
    const extension = file.name.split('.').pop();

    switch (extension) {
      case 'json':
        return from(file.async('string'))
        .pipe(
          map((content: string) => this.createFileResponse(file.name, JSON.parse(content)))
        );
      case 'png':
        return from(file.async('base64'))
        .pipe(
          map((content: string) =>
            this.createFileResponse(file.name, this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + content))
          )
        );
      case 'jpg':
      case 'jpeg':
        return from(file.async('base64'))
        .pipe(
          map((content: string) =>
            this.createFileResponse(file.name, this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + content))
          )
        );
      case 'gif':
        return from(file.async('base64'))
        .pipe(
          map((content: string) =>
            this.createFileResponse(file.name, this.sanitizer.bypassSecurityTrustUrl('data:image/gif;base64,' + content))
          )
        );
      case 'pdf': // ignore PDF
        break;
      default:
        console.warn('Not supported file type:', file.name);
        break;
    }

    return EMPTY;
  }

  private createFileResponse(filename, content) {
    const object = {};
    object[filename] = content;
    return object;
  }

  private loadZip(response) {
    return from(JSZip.loadAsync(response.body));
  }

  private getFiles(zip) {
    return of(...Object.values(zip.files));
  }
}
