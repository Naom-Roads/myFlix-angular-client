import {Component} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { DirectorsComponent } from "../directors/directors.component";
import { GenresComponent } from "../genres/genres.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];

  constructor(public fetchApiData: FetchApiDataService, private dialog: MatDialog) { }

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
        data: { director }
      });
  }

  openGenreView(genres: Array<any>): void {
    console.log(genres);
    this.dialog.open(GenresComponent, {
      width: '500px',
      data: { genres }
    });
  }
}
