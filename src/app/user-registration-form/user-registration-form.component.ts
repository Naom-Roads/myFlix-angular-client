// src/app/user-registration-form/user-registration-form.component.ts
import {Component, OnInit, Input} from '@angular/core';
// Import closes the dialog on success
import {MatDialogRef} from '@angular/material/dialog';
// This import brings in the API calls
import {FetchApiDataService} from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * @module UserRegistrationFormComponent
 * Handles the registration of a new user
 */

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  // These are the values that will be pass through the form
  @Input() userData = {username: '', password: '', email: '', birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) {
  }

  // called once the component has received all of its inputs
  ngOnInit(): void {
  }

  /**
   * @function registerUser
   * Opens dialog for registration
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for successful user registration goes here
      this.dialogRef.close(); // Close Modal at success
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
