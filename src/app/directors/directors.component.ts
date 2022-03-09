import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

/**
 * @module Directors
 * Component handles the director dialogue pop-up dialogue
 */

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent {
  director: any;
  /**
   * @param data Passes director bio, name and birthdate to movie card component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) private data: { director: any }) {
  }
  ngOnInit(): void {
    this.director = this.data.director
  }
}
