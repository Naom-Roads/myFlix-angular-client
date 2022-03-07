import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit {
  description: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { description : any}) { }

  ngOnInit(): void {
    this.description = this.data.description;
  }
}
