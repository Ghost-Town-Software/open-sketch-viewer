import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {ProjectCreatorComponent} from '../shared/project-creator/project-creator.component';
import * as fs from 'fs';
import * as path from 'path';
import * as yauzl from 'yauzl';
import {AppService} from '../services/app.service';
import {Observable} from 'rxjs';

const remote = require('electron').remote;
const app = remote.app;

@Injectable()
export class ProjectCreatorService {
  private file: File;

  constructor(private modalService: BsModalService, private app: AppService) {

  }

  extract(file: File, destination: string) {
    return new Observable(subscriber => {
      yauzl.open(file.path, {lazyEntries: true}, (err: any, zip) => {
        if (err) throw err;

        zip.readEntry();
        zip.on("entry", (entry) => {
          const target = path.join(destination, entry.fileName);

          if (/\/$/.test(entry.fileName)) {
            zip.readEntry();
          } else {
            // file entry
            zip.openReadStream(entry, (err, readStream: any) => {
              if (err) throw err;

              if(!fs.existsSync(path.dirname(target))) {
                fs.mkdirSync(path.dirname(target), { recursive: true })
              }

              readStream.on("end", () => {
                zip.readEntry();
              });

              readStream.pipe(fs.createWriteStream(target));
            });
          }
        });

        zip.on('error', () => {
          subscriber.next();
          subscriber.complete();
        });

        zip.on('close', () => {
          subscriber.next();
          subscriber.complete();
        })
      });
    });
  }

  isValidFile(file: File): boolean {
    if(!file) {
      return false;
    }

    return file.name.endsWith('.sketch');
  }

  showCreator(file: File): void {
    this.file = file;

    const modal = this.modalService.show(ProjectCreatorComponent, {
      initialState: {
        path: app.getPath('home')
      },
      ignoreBackdropClick: true,
      backdrop: 'static',
      keyboard: false,
    });

    modal.content.create$.subscribe((path: string) => {
      this.extract(file, path).subscribe(() => {
        this.app.createProject(path);
      });
    });
  }
}
