import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {WorkspaceComponent} from './components/workspace/workspace.component';
import {AttributesPanelComponent} from './components/attributes-panel/attributes-panel.component';
import {StructurePanelComponent} from './components/structure-panel/structure-panel.component';
import {ArtboardComponent} from './components/artboard/artboard.component';
import {setInjector} from './injector.static';
import {DebugComponent} from './components/debug/debug.component';
import {TextRendererComponent} from './components/text-renderer/text-renderer.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    AttributesPanelComponent,
    StructurePanelComponent,
    TextRendererComponent,
    ArtboardComponent,
    DebugComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(i: Injector) {
    setInjector(i);
  }
}
