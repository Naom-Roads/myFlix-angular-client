import {Component} from '@angular/core';
import {MovieCardComponent} from "./movie-card/movie-card.component";
import { Location } from "@angular/common";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import {Router} from "@angular/router";
import {FetchApiDataService} from "./fetch-api-data.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {DirectorsComponent} from "./directors/directors.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
  user: any;
  public fallbacks = [
    'mp',
  ];

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") as string);
  }

  // this function routes to user profile
  userProfile(): void {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem("user") as string);
    }
    this.router.navigate(["/", "users", this.user.username]);

  }
}
