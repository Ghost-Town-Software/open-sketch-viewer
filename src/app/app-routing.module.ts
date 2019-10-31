import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectResolver} from "./resolvers/project.resolver";
import {ProjectComponent} from "./components/project/project.component";


const routes: Routes = [{
  path: '',
  component: ProjectComponent,
  resolve: {
    state: ProjectResolver
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
