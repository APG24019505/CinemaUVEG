import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; 
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  private movieService = inject(MovieService);
  private cdr = inject(ChangeDetectorRef); 
  
  movies: Movie[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    console.log('Componente inicializado. Llamando a la API...');
    
    this.movieService.getTopRatedMovies().subscribe({
      next: (response) => {
        console.log('¡Datos llegaron!', response.results.length, 'películas.');
        this.movies = response.results;
        this.loading = false;
        
        // FORZA a Angular a actualizar la pantalla inmediatamente
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error de TMDB:', err);
        this.error = 'Error al cargar las películas.';
        this.loading = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  getImageUrl(path: string): string {
    return this.movieService.getImageUrl(path);
  }
}