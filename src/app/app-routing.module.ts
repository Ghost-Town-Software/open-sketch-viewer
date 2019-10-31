import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectResolver} from './resolvers/project.resolver';
import {ProjectComponent} from './components/project/project.component';
import {PageComponent} from './components/page/page.component';
import {PageResolver} from './components/page/page.resolver';


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
