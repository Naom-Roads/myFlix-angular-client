// src/app/user-registration-form/user-registration-form.component.ts
import {Component, OnInit, Input} from '@angular/core';
// Import closes the dialog on success
import {MatDialogRef} from '@angular/material/dialog';
// This import brings in the API calls
import {FetchApiDataService} from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This function sends form input to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close();
      this.snackBar.open(response, 'Ok', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'Ok', {
        duration: 2000
      });
    });
  }
}
