import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private cdr = inject(ChangeDetectorRef); 
  movie: Movie | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    // Extraemos el ID de la URL (ej. /pelicula/155)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID de la película extraído:', id); 

    if (id && id > 0) {
      this.movieService.getMovieDetail(id).subscribe({
        next: (data) => {
          console.log('Detalle de película recibido:', data);
          this.movie = data;
          this.loading = false;
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('Error al cargar detalle:', err);
          this.error = 'No se pudo cargar la información de la película.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.error = 'ID de película no válido.';
      this.loading = false;
    }
  }

  getImageUrl(path: string): string {
    return this.movieService.getImageUrl(path);
  }
}