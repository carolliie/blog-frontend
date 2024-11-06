import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { DeletePostComponent } from './pages/delete-post/delete-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { title: 'Carollie' } },
  { path: 'create-post', component: CreatePostComponent,  data: { title: 'Creating post...' } },
  { path: 'blog', component: ViewAllComponent,  data: { title: "Carollie's blog" } },
  { path: 'view-post/:slug', component: ViewPostComponent},
  { path: 'delete-post', component: DeletePostComponent},
  { path: 'edit-post/:slug', component: EditPostComponent,  data: { title: 'Editing post...' } },
  { path: 'login', component: LoginComponent,  data: { title: 'Login - Carollie' } },
  { path: 'home', component: HomeComponent, data: { title: 'Carollie' }}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }