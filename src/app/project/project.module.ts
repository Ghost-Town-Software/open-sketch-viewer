import {NgModule} from '@angular/core';
import {ProjectComponent} from './project.component';
import {RouterModule} from '@angular/router';
import {routes} from './project.routes';
import {PageListComponent} from './page-list/page-list.component';
import {ProjectResolver} from './project.resolver';
import {PageListResolver} from './page-list/page-list.resolver';
import {CommonModule} from '@angular/common';
import {ArtboardListResolver} from './artboard-list/artboard-list.resolver';
import {ArtboardListComponent} from './artboard-list/artboard-list.component';
import {ArtboardComponent} from './artboard/artboard.component';
import {ArtboardResolver} from './artboard/artboard.resolver';
import {StructurePanelComponent} from './structure-panel/structure-panel.component';
import {AttributesPanelComponent} from './attributes-panel/attributes-panel.component';

@NgModule({
  declarations: [
    ProjectComponent,
    PageListComponent,
    ArtboardListComponent,
    ArtboardComponent,
    StructurePanelComponent,
    AttributesPanelComponent
  ],
  providers: [
    ProjectResolver,
    PageListResolver,
    ArtboardListResolver,
    ArtboardResolver,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProjectModule {

}
