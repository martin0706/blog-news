import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuardGuard} from './auth-guard.guard'
import { CreateNewsComponent } from './create-news/create-news.component';

const routes: Routes = [
  {path: "create/news", component: CreateNewsComponent},
  {path:"register", component: RegisterComponent, canActivate: [AuthGuardGuard]},
  {path:"login", component: LoginComponent, canActivate: [AuthGuardGuard]},
  {path:"logout", component: HomeComponent},
  {path:"", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
