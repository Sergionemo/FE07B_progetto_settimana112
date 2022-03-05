import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './dashboard/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupPage } from './auth/signup.page';
import { LoginPage } from './auth/login.page';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './auth/token.interceptor';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule} from'@angular/material/list';
import { ProfiloPage } from './pages/profilo.page';
import { FilmPage } from './pages/film.page';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [AppComponent, NavbarComponent, SignupPage, LoginPage, DashboardComponent, ProfiloPage, FilmPage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
