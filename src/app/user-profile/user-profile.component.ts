import {Component, Inject, Input, OnInit} from '@angular/core';
import {MovieCardComponent} from "../movie-card/movie-card.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FetchApiDataService} from "../fetch-api-data.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {DirectorsComponent} from "../directors/directors.component";
import {GenresComponent} from "../genres/genres.component";
import {MatDialog} from "@angular/material/dialog";
import {MovieDescriptionComponent} from "../movie-description/movie-description.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  favoriteMovies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];

  @Input() userData = {username: '', password: '', email: '', birthday: ''};

  constructor(@Inject(MAT_DIALOG_DATA) private data: { user: any },
              public fetchApiData: FetchApiDataService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") as string);
    console.log(this.user);
    this.getFavoriteMovies();

  }

  // Updates user
  updateUser(): void {
    this.fetchApiData.patchUser(this.user).subscribe((response) => {
      this.snackBar.open(response, 'Your information has been updated successfully', {
        duration: 2000
      });
      console.log(response);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies(this.user.username).subscribe((res) => {
      this.favoriteMovies = res;
    });
  }

  openDirectorView(director: any): void {
    this.dialog.open(DirectorsComponent, {
      width: '500px',
      data: {director}
    });
  }

  openGenreView(genres: Array<any>): void {
    console.log(genres);
    this.dialog.open(GenresComponent, {
      width: '500px',
      data: {genres}
    });
  }


  openSynopsisView(description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      width: '500px',
      data: { description }
    });
  }



}


