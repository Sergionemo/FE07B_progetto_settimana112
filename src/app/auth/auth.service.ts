import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatiLogin } from '../models/dati-login';
import { DatiSignup } from '../models/dati-signup';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:4201';
  private authSubj = new BehaviorSubject<null | DatiLogin>(null);
  timeoutLogout: any;
  jwtHelper = new JwtHelperService();
  user$ = this.authSubj.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  login(data: DatiLogin) {
    return this.http.post<DatiLogin>(`${this.url}/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        const expirationDate = this.jwtHelper.getTokenExpirationDate(
          data.accessToken
        ) as Date;
        this.autoLogout(expirationDate);
      })
    );
  }

  registration(data: DatiSignup) {
    return this.http.post(`${this.url}/register`, data);
  }

  autoLogout(expirationDate: Date) {
    const expMs = expirationDate.getTime() - new Date().getTime();
    this.timeoutLogout = setTimeout(() => {
      this.logout();
    }, expMs);
  }

  logout() {
    this.authSubj.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout);
    }
  }
  restoreUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user: DatiLogin = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(user.accessToken)) {
      return;
    }
    this.authSubj.next(user);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(
      user.accessToken
    ) as Date;
    this.autoLogout(expirationDate);
  }
}
