import {Routes} from '@angular/router';
import {PageListComponent} from './page-list/page-list.component';
import {PageListResolver} from './page-list/page-list.resolver';
import {ProjectResolver} from './project.resolver';
import {ArtboardListComponent} from './artboard-list/artboard-list.component';
import {ArtboardListResolver} from './artboard-list/artboard-list.resolver';
import {ArtboardComponent} from './artboard/artboard.component';
import {ArtboardResolver} from './artboard/artboard.resolver';
import {ProjectComponent} from './project.component';

export const routes: Routes = [
  {
    path: ':id',
    resolve: {
      project: ProjectResolver
    },
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: PageListComponent,
        resolve: {
          pages: PageListResolver
        },
      },
      {
        path: 'page/:pageId',
        resolve: {
          page: ArtboardListResolver
        },
        children: [
          {
            path: '',
            component: ArtboardListComponent,
          },
          {
            path: 'artboard/:artboardId',
            component: ArtboardComponent,
            resolve: {
              artboard: ArtboardResolver
            }
          }
        ]
      },
    ]
  }
];
