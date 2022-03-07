import {Component} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { DirectorsComponent } from "../directors/directors.component";
import { GenresComponent } from "../genres/genres.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MovieDescriptionComponent} from "../movie-description/movie-description.component";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];

  constructor(public fetchApiData: FetchApiDataService, private dialog: MatDialog,  public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void  {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
    });
  }

  openDirectorView(director: any): void {
    this.dialog.open(DirectorsComponent, {
        width: '500px',
        data: { director },
      });
  }

  openGenreView(genres: Array<any>): void {
    console.log(genres);
    this.dialog.open(GenresComponent, {
      width: '500px',
      data: { genres }
    });
  }

  openSynopsisView(description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      width: '500px',
      data: { description }
    });
  }

  addFavoriteMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.fetchApiData.postFavoriteMovies(movie._id, user.username).subscribe((response: any) => {
      if (movie) {
        this.snackBar.open( 'Movie has been added', 'Close', {
          duration: 3000,
        });
      }
    console.log(response);
    }, () => {
      this.snackBar.open('Movie has already been added', 'Close', {
        duration: 3000,
      });
    });
  }
}
