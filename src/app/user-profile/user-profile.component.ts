import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FetchApiDataService} from "../fetch-api-data.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {DirectorsComponent} from "../directors/directors.component";
import {GenresComponent} from "../genres/genres.component";
import {MatDialog} from "@angular/material/dialog";
import {MovieDescriptionComponent} from "../movie-description/movie-description.component";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

/**
 * Shows the users profile information and favorite movies list
 * @module UserProfileComponent
 */

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  oldUsername: string;
  favoriteMovies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];

  @Input() userData = {username: '', password: '', email: '', birthday: ''};

  constructor(@Inject(MAT_DIALOG_DATA) private data: { user: any },
              public fetchApiData: FetchApiDataService,
              public dialog: MatDialog,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") as string);
    this.oldUsername = this.user.username;
    console.log(this.user);
    this.getFavoriteMovies();

  }

  /**
   * @function updateUser
   * Takes input on user update form
   * @returns Updated user information in JSON format
   */

  updateUser(): void {
    this.fetchApiData.patchUser(this.oldUsername, {
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      birthday: this.user.birthday,
    }).subscribe((response) => {
      localStorage.setItem("user", JSON.stringify(this.user));
      window.open(environment.url + '/users/' + this.user.username, "_self");
      this.snackBar.open('Your information has been updated successfully', 'Close', {
        duration: 2000
      });
      console.log(response);
    });
  }

  /**
   * @function getFavoriteMovies
   * Gets list of favorite movies through the user's username
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies(this.user.username).subscribe((res) => {
      this.favoriteMovies = res;
    });
  }

  /**
   * @function removeFavoriteMovie
   * @param movieId {string}
   * @returns Message confirming the movie is no long in the list of favorite movies
   */

  removeFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(this.user.username, movieId).subscribe((res) => {
      this.favoriteMovies = res;
        this.snackBar.open( 'Movie has been removed', 'Close', {
          duration: 3000,
        });
    }, () => {
      this.snackBar.open('Movie has already been removed', 'Close', {
        duration: 3000,
      });
    });
  }

  /**
   * Opens dialog box with information regarding director
   * @function openDirectorView
   * @param director
   */

  openDirectorView(director: any): void {
    this.dialog.open(DirectorsComponent, {
      width: '500px',
      data: {director}
    });
  }

  /**
   * Opens a dialog box with an array of Genres
   * @function openGenreView
   * @param genres {array}
   */

  openGenreView(genres: Array<any>): void {
    console.log(genres);
    this.dialog.open(GenresComponent, {
      width: '500px',
      data: {genres}
    });
  }

  /**
   * Opens dialog box with description of movie
   * @function openSynopsisView
   * @param description
   */

  openSynopsisView(description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      width: '500px',
      data: { description }
    });
  }
}


