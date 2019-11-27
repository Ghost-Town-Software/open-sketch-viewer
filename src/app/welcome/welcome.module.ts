import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome.component';
import {ProjectSelectorComponent} from './project-selector/project-selector.component';
import {ProjectUploaderComponent} from './project-uploader/project-uploader.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './welcome.routes';
import {ProjectCreatorService} from './project-creator.service';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    WelcomeComponent,
    ProjectSelectorComponent,
    ProjectUploaderComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProjectCreatorService
  ]
})
export class WelcomeModule {
}
