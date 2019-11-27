import {NgModule} from '@angular/core';
import {ModalModule} from 'ngx-bootstrap';
import {ProjectCreatorModule} from './project-creator/project-creator.module';
import {ProjectRemoveModule} from './project-delete/project-remove.module';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    ProjectCreatorModule,
    ProjectRemoveModule,
  ],
  exports: [
    ModalModule,
    ProjectCreatorModule,
    ProjectRemoveModule,
  ]
})
export class SharedModule {

}
