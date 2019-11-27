import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectRemoveComponent} from './project-remove.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ProjectRemoveComponent
  ],
  entryComponents: [
    ProjectRemoveComponent
  ],
  exports: [
    ProjectRemoveComponent
  ]
})
export class ProjectRemoveModule {

}
