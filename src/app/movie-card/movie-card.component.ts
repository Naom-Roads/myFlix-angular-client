import {Component} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { DirectorsComponent } from "../directors/directors.component";
import { GenresComponent } from "../genres/genres.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MovieDescriptionComponent} from "../movie-description/movie-description.component";

/**
 * @module MovieCardComponent
 * This handles this entire view for the movie card,
 * it has the functionality for viewing the data associated with the other components
 * and displays them in dialogues that the user can access by clicking a button
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];

  /**
   * @param fetchApiData Pulls in the data from the MyFlix API database
   * @param dialog Users angular material to create a dialog box that appears when a button is pressed
   * @param snackBar Loads a message when an action has been executed, to indicate if action was successful
   */

  constructor(public fetchApiData: FetchApiDataService, private dialog: MatDialog,  public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Uses api to get all movies and related data
   * @function getMovies
   * @return movies in JSON format
   */

  getMovies(): void  {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
    });
  }

  /**
   *  Opens dialog box with director information
   * @function openDirectorView
   * @param director
   */

  openDirectorView(director: any): void {
    this.dialog.open(DirectorsComponent, {
        width: '500px',
        data: { director },
      });
  }

  /**
   * Opens dialog with view of all genres associated with selected movie
   * @function openGenreView
   * @param genres {array}
   */

  openGenreView(genres: Array<any>): void {
    console.log(genres);
    this.dialog.open(GenresComponent, {
      width: '500px',
      data: { genres }
    });
  }

  /**
   * Opens dialog with synopsis for film
   * @function openSynopsisView
   * @param description {string}
   */

  openSynopsisView(description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      width: '500px',
      data: { description }
    });
  }

  /**
   * Allows user to add a favorite movie to their favorite movies list
   * @function addFavoriteMovies
   * @param movie
   */

  addFavoriteMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.fetchApiData.postFavoriteMovies(movie._id, user.username).subscribe((response: any) => {
      if (movie) {
        this.snackBar.open( 'Movie has been added', 'Close', {
          duration: 3000,
        });
      }
    }, () => {
      this.snackBar.open('Movie has already been added', 'Close', {
        duration: 3000,
      });
    });
  }
}
