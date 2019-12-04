import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../../model/config.model';

@Component({
  selector: 'project-selector',
  templateUrl: './project-selector.template.html',
  styleUrls: ['./project-selector.styles.scss']
})
export class ProjectSelectorComponent implements OnDestroy {
  @Input('projects') projects: Observable<Project[]>;
  @Output('delete') delete$: EventEmitter<Project> = new EventEmitter<Project>();
  @Output('load') load$: EventEmitter<Project> = new EventEmitter<Project>();

  ngOnDestroy(): void {
    this.delete$.complete();
  }

  load(project: Project) {
    this.load$.emit(project);
  }

  delete(project: Project) {
    this.delete$.emit(project);
  }
}
