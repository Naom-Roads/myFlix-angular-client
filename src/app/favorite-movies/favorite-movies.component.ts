import { Component, OnInit } from '@angular/core';

/**
 * This is a dummy component for favorite movies,
 * it simply allows the favorite movies to be displayed in the users profile page.
 * @module FavoriteMoviesComponent
 */


@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})

export class FavoriteMoviesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
