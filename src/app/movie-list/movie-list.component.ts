import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // <-- Nuevo import
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
  private cdr = inject(ChangeDetectorRef); // <-- Inyectamos el detector
  
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
        
        // FORZAMOS a Angular a actualizar la pantalla inmediatamente
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error de TMDB:', err);
        this.error = 'Error al cargar las películas.';
        this.loading = false;
        this.cdr.detectChanges(); // También forzamos en caso de error
      }
    });
  }

  getImageUrl(path: string): string {
    return this.movieService.getImageUrl(path);
  }
}