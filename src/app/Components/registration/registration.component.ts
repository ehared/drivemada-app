/**
 * Filename: registration.component.ts
 * Purpose: Generates registration component and presents a form for a user to create an account.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { UtilService } from 'src/app/Services/util.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class RegistrationComponent {

  user = new User;
  account: {
    confirmPass: string,
    isConfirmed: boolean
  } = {
      confirmPass: '',
      isConfirmed: false,
    }

  /**
   * Constructor for registration component
   * @param router - router used to navigate through url pages
   * @param userService - service used to make user specific api calls
   * @param utilService - service used to create toasts, alerts, and print messages onto console
   * @param menuController - enables and disables side menu
   */
  constructor(public router: Router, private userService: UserService, private utilService: UtilService, private menuController: MenuController) { 
    this.menuController.enable(false);
  }

  /**
   * Checks to see the password entered in both password and confirm password field match
   */
  passConfirm() {
    if (this.user.password === this.account.confirmPass) {
      this.account.isConfirmed = true;
      console.log("passwords do match");
    }
    else {
      this.account.isConfirmed = false;
      console.log("passwords do not match");
    }
  }

  /**
   * Creates a user account
   * @param form 
   */
  signUp() {

    /* convert user model to json to send to the server */
    console.log(this.user)
    let jsonString = JSON.stringify(this.user);
    console.log(jsonString)
    debugger;
    this.userService.create(jsonString).subscribe(() => {
      /* user was successfully added to caremada database, navigate to login and presenet alert  */
      
      console.log(jsonString);
      this.router.navigateByUrl('login');
      this.utilService.presentAlert("Please check your email to validate your account");
    }, (err) => {
      /* unsuccessful in adding user to the caremada database */
      console.log(jsonString);
      console.log("error occured");
      if (err.status === 409) {
        console.log("Email already exists");
        this.utilService.presentToast("User with " + this.user.email + " already exists.")
      }
      if (err.status === 503) {
        console.log("Error occured while trying to create account");
        this.utilService.presentToast("Unable to create account.");
      }

      
    });

  }
  /**
   *  Navigates to the login page
   */
  goBackToLogin() {
    this.router.navigateByUrl('welcome');
  }

  /**
   * Checks to see if the user is of age to register (not implmented yet)
   * @param dateOfBirth - string representation of DOB
   */
  getAge(dateOfBirth: string) {

    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();

    console.log(age);
  }

}
