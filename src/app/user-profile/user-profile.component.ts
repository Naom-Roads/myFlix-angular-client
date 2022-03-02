import { Component, OnInit } from '@angular/core';
import {MovieCardComponent} from "../movie-card/movie-card.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Might user this later to redirect user to all movies
  //
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: '500px'
  //   });
  // }

}
