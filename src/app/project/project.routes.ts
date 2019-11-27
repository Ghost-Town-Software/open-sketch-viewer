import {Routes} from '@angular/router';
import {PageListComponent} from './page-list/page-list.component';
import {PageListResolver} from './page-list/page-list.resolver';
import {ProjectResolver} from './project.resolver';
import {ArtboardListComponent} from './artboard-list/artboard-list.component';
import {ArtboardListResolver} from './artboard-list/artboard-list.resolver';
import {ArtboardComponent} from './artboard/artboard.component';
import {ArtboardResolver} from './artboard/artboard.resolver';

export const routes: Routes = [
  {
    path: ':id',
    resolve: {
      project: ProjectResolver
    },
    children: [
      {
        path: '',
        component: PageListComponent,
        resolve: {
          pages: PageListResolver
        }
      },
      {
        path: 'page/:pageId',
        component: ArtboardListComponent,
        resolve: {
          page: ArtboardListResolver
        }
      },
      {
        path: 'page/:pageId/artboard/:artboardId',
        component: ArtboardComponent,
        resolve: {
          page: ArtboardResolver
        }
      }
    ]
  }
];
