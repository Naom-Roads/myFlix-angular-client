import {Component, Inject, OnInit} from '@angular/core';
import {MovieCardComponent} from "../movie-card/movie-card.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: { user: any }) { }

  ngOnInit(): void {
    this.user = this.data.user;
  }

  // Might user this later to redirect user to all movies
  //
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: '500px'
  //   });
  // }

}
