import {Routes} from '@angular/router';
import {ProjectResolver} from './resolvers/project.resolver';
import {ArtboardComponent} from './components/artboard/artboard.component';
import {ArtboardResolver} from './components/artboard/artboard.resolver';
import {TextRendererComponent} from './components/text-renderer/text-renderer.component';


export const routes: Routes = [
  {
    path: 'something',
    resolve: {
      state: ProjectResolver
    },
    children: [
      // {
      //   path: 'page/:id',
      //   component: PageComponent,
      //   resolve: {
      //     page: PageResolver
      //   }
      // },
      {
        path: 'page/:pageId/artboard/:artboardId',
        component: ArtboardComponent,
        resolve: {
          artboard: ArtboardResolver
        }
      }
    ]
  },
  {
    path: 'text-renderer',
    component: TextRendererComponent,
  },
  {
    path: '',
    loadChildren: 'app/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'project',
    loadChildren: 'app/project/project.module#ProjectModule'
  }
];
