import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' },
  { path: 'peliculas', component: MovieListComponent },
  { path: 'pelicula/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '/peliculas' }
];