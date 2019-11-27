import {NgModule} from '@angular/core';
import {ProjectComponent} from './project.component';
import {RouterModule} from '@angular/router';
import {routes} from './project.routes';
import {PageListComponent} from './page-list/page-list.component';
import {ProjectResolver} from './project.resolver';
import {PageListResolver} from './page-list/page-list.resolver';
import {CommonModule} from '@angular/common';
import {NewProjectService} from './project.service';
import {ArtboardListResolver} from './artboard-list/artboard-list.resolver';
import {ArtboardListComponent} from './artboard-list/artboard-list.component';
import {ArtboardComponent} from './artboard/artboard.component';
import {ArtboardResolver} from './artboard/artboard.resolver';

@NgModule({
  declarations: [
    ProjectComponent,
    PageListComponent,
    ArtboardListComponent,
    ArtboardComponent
  ],
  providers: [
    ProjectResolver,
    PageListResolver,
    ArtboardListResolver,
    ArtboardResolver,
    NewProjectService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProjectModule {

}
