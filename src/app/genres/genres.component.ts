import { Component, Inject } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {
  genres: any[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) private data: { genres : any}) {

  }

  ngOnInit(): void {
    this.genres = this.data.genres;
    console.log(this.genres);
  }
}
