import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

/**
 * Displays array of genres associated with movie
 * @module GenresComponent
 */


@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})

export class GenresComponent {
  genres: any[] = [];

  /**
   * @param data passes description of all genres associated with a film to the movie card component
   */

  constructor(@Inject(MAT_DIALOG_DATA) private data: { genres : any}) {
  }

  ngOnInit(): void {
    this.genres = this.data.genres;
    console.log(this.genres);
  }
}
