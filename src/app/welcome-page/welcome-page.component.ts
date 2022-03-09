import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent} from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";

/**
 * @module WelcomePageComponent
 * Welcome page gives the user the ability to sign in or sign up
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /**
   * @function openUserRegistration
   * opens dialog box with form for registration
   */

openUserRegistration(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * @function openUserLoginDialog
   * Opens dialog box with login form
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

}
