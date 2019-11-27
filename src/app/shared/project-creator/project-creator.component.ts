import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap';

const remote = require('electron').remote;
const dialog = remote.dialog;

@Component({
  selector: 'project-creator',
  templateUrl: './project-creator.template.html',
  styleUrls: ['./project-creator.styles.scss']
})
export class ProjectCreatorComponent {
  path: string;
  create$: Subject<string> = new Subject<string>();

  constructor(private modal: BsModalRef) {

  }

  selectDirectory() {
    dialog.showOpenDialog({
      defaultPath: this.path,
      properties: ['openDirectory']
    }).then(result => {
      if (result.canceled || !result.filePaths.length) {
        return;
      }

      this.path = result.filePaths[0];
    }).catch(err => {
      console.log(err)
    });
  }

  close() {
    this.modal.hide();
  }

  create() {
    this.create$.next(this.path);
    this.close();
  }
}
