import {Routes} from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'project',
    loadChildren: 'app/project/project.module#ProjectModule'
  }
];
