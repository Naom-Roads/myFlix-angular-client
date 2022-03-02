import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent {
  director: any;


  constructor(@Inject(MAT_DIALOG_DATA) private data: { director: any }) {
  }

  ngOnInit(): void {
    this.director = this.data.director
  }

}
