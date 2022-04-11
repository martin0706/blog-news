import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuardGuard} from './auth-guard.guard'
import { CreateNewsComponent } from './create-news/create-news.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { ContentNewsComponent } from './content-news/content-news.component';
import { ReadLaterComponent } from './read-leater/read-later.component';

const routes: Routes = [
  {path: "news/read-leater", component: ReadLaterComponent,pathMatch: 'full',canActivate: [AuthGuardGuard]},
  {path: "news/:id", component: ContentNewsComponent, pathMatch: 'full'},
  {path: "news/edit/:id", component: EditNewsComponent,canActivate: [AuthGuardGuard]},
  {path: "create/news", component: CreateNewsComponent,canActivate: [AuthGuardGuard]},
  {path: "news", component: AllNewsComponent, pathMatch: 'full',canActivate: [AuthGuardGuard]},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"logout", component: HomeComponent},
  {path:"", component: HomeComponent,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
