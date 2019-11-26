import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ProjectComponent} from './components/project/project.component';
import {WorkspaceComponent} from './components/workspace/workspace.component';
import {AttributesPanelComponent} from './components/attributes-panel/attributes-panel.component';
import {StructurePanelComponent} from './components/structure-panel/structure-panel.component';
import {PageComponent} from './components/page/page.component';
import {ArtboardComponent} from './components/artboard/artboard.component';
import {setInjector} from './injector.static';
import {DebugComponent} from './components/debug/debug.component';
import {TextRendererComponent} from './components/text-renderer/text-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    WorkspaceComponent,
    AttributesPanelComponent,
    StructurePanelComponent,
    TextRendererComponent,
    PageComponent,
    ArtboardComponent,
    DebugComponent,
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
  constructor(i: Injector) {
    setInjector(i);
  }
}
