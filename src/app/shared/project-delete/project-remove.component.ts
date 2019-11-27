import {Component} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'project-remove',
  templateUrl: './project-remove.template.html',
  styleUrls: ['./project-remove.styles.scss']
})
export class ProjectRemoveComponent {
  delete$: Subject<boolean> = new Subject();

  constructor(private modal: BsModalRef) {

  }

  close() {
    this.modal.hide();
  }

  keepFiles() {
    this.delete$.next(false);
  }

  deleteAll() {
    this.delete$.next(true);
  }
}
