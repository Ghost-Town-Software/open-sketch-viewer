import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectResolver} from './resolvers/project.resolver';
import {ProjectComponent} from './components/project/project.component';
import {PageComponent} from './components/page/page.component';
import {PageResolver} from './components/page/page.resolver';
import {ArtboardComponent} from './components/artboard/artboard.component';
import {ArtboardResolver} from './components/artboard/artboard.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      state: ProjectResolver
    },
    children: [
      {
        path: '',
        component: ProjectComponent,
      },
      {
        path: 'page/:id',
        component: PageComponent,
        resolve: {
          page: PageResolver
        }
      },
      {
        path: 'page/:pageId/artboard/:artboardId',
        component: ArtboardComponent,
        resolve: {
          artboard: ArtboardResolver
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
