import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { DeletePostComponent } from './pages/delete-post/delete-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'view-all', component: ViewAllComponent},
  { path: 'view-post/:slug', component: ViewPostComponent},
  { path: 'delete-post', component: DeletePostComponent},
  { path: 'edit-post/:slug', component: EditPostComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'boardAdmin', component: BoardAdminComponent},
  { path: 'boardUser', component: BoardUserComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }