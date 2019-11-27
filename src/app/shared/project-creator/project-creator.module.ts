import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectCreatorComponent} from './project-creator.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ProjectCreatorComponent
  ],
  entryComponents: [
    ProjectCreatorComponent
  ],
  exports: [
    ProjectCreatorComponent
  ]
})
export class ProjectCreatorModule {

}
