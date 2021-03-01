import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsComponent } from './components/errors/errors.component';
import { GetDataComponent } from './components/get-data/get-data.component';
import { HeadersComponent } from './components/headers/headers.component';
import { InterseptorsComponent } from './components/interseptors/interseptors.component';
import { PostComponent } from './components/post/post.component';
import { RestInServiceComponent } from './components/rest-in-service/rest-in-service.component';

const routes: Routes = [
  {path: '', redirectTo: 'intro', pathMatch: 'full'}, // '' will render to home component
  {path: 'getData', component: GetDataComponent},
  {path: 'post', component: PostComponent},
  {path: 'restInService', component: RestInServiceComponent},
  {path: 'errors', component: ErrorsComponent},
  {path: 'headers', component: HeadersComponent},
  {path: 'interseptors', component: InterseptorsComponent},


  {path: '**', component: GetDataComponent}  // '**' something goes wrong, will render to home component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
