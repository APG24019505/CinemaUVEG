import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = environment.tmdbApiUrl;
  private imageUrl = environment.tmdbImageUrl;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${environment.tmdbBearerToken}`,
      'Content-Type': 'application/json'
    });
  }

  getTopRatedMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/top_rated?page=${page}&language=es-ES`,
      { headers: this.getHeaders() }
    );
  }

  getMovieDetail(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?language=es-ES`,
      { headers: this.getHeaders() }
    );
  }

  getImageUrl(path: string): string {
    return path ? `${this.imageUrl}${path}` : 'assets/no-image.png';
  }
}