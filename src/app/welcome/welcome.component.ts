import {Component} from '@angular/core';
import {AppService} from '../services/app.service';
import {Observable} from 'rxjs';
import {ProjectRemoveComponent} from '../shared/project-delete/project-remove.component';
import {BsModalService} from 'ngx-bootstrap';
import * as rimraf from 'rimraf';
import {Router} from '@angular/router';
import {Project} from '../model/config.model';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.template.html',
  styleUrls: ['./welcome.styles.scss']
})
export class WelcomeComponent {
  projects: Observable<Project[]>;

  constructor(private app: AppService, private router: Router, private modalService: BsModalService) {
    this.projects = this.app.projects$;
  }

  load(project: Project) {
    console.log('navigate', ['/project', project.id]);
    this.router.navigate(['/project', project.id]);
  }

  delete(project: Project) {
    const modal = this.modalService.show(ProjectRemoveComponent, {
      ignoreBackdropClick: true,
      backdrop: 'static',
      keyboard: false,
    });

    modal.content.delete$.subscribe(deleteFiles => {
      if(deleteFiles) {
        rimraf.sync(project.path);
      }

      this.app.removeProject(project);
      modal.hide();
    });
  }
}
