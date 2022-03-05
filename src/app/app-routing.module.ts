import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './auth/guard.guard';
import { LoginPage } from './auth/login.page';
import { SignupPage } from './auth/signup.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmPage } from './pages/film.page';
import { ProfiloPage } from './pages/profilo.page';

const routes: Routes = [
  {
    path: "signup",
    component: SignupPage
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "home",
    component: DashboardComponent,
    canActivate:[GuardGuard],
    children:[
      {
        path:'profilo',
        component: ProfiloPage
      },
      {
        path: 'film',
        component: FilmPage
      }
    ]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
