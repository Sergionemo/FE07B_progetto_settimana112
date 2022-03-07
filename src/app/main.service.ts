import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './models/movie';
import { DatiLogin } from './models/dati-login';
import { Favoriti } from './models/favoriti';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  getAllMovie() {
    return this.http.get<Movie[]>(`${environment.apiBaseUrl}/movies-popular`);
  }

  getUtente() {
    const idUtente = localStorage.getItem('user');
    if (!idUtente) {
      return;
    }
    const userdata: DatiLogin = JSON.parse(idUtente);
    return this.http.get<DatiLogin>(
      `${environment.apiBaseUrl}/users/${userdata.user.id}`
    );
  }

  addFav(data: { movieId: number; userId: number }) {
    return this.http.post<Favoriti>(
      `${environment.apiBaseUrl}/favorites`,
      data
    );
  }

  removeFav(id: number) {
    return this.http.delete<Favoriti>(
      `${environment.apiBaseUrl}/favorites/${id}`
    );
  }

  findFav(id: number) {
    return this.http.get(`${environment.apiBaseUrl}/favorites?userId=${id}`);
  }
}
