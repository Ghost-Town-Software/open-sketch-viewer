import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ProjectComponent} from './components/project/project.component';
import {WorkspaceComponent} from './components/workspace/workspace.component';
import {AttributesPanelComponent} from './components/attributes-panel/attributes-panel.component';
import {StructurePanelComponent} from './components/structure-panel/structure-panel.component';
import {PageComponent} from './components/page/page.component';
import {ArtboardComponent} from './components/artboard/artboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    WorkspaceComponent,
    AttributesPanelComponent,
    StructurePanelComponent,
    PageComponent,
    ArtboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
