/**
 * Filename: settings.component.ts
 * Purpose: Renders the settings component
 * Author: Eltire Hared
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AlertController, ToastController } from "@ionic/angular"
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  /**
   * Constructor
   * @param router - router to navigate to pages/components 
   * @param userService - user service to make user related http calls
   * @param alertController  - alert controller to present alert dialog
   */
  constructor(public router: Router, public userService: UserService, public alertController: AlertController) { }

  ngOnInit() { }

  /**
   *  Navigates to the edit account component
   */
  goEditAcct() {
    this.router.navigateByUrl('editAcct');
  }

  goEditPassword(){
    this.router.navigateByUrl('editPassword');
  }

  /**
   *  calls user service to clear storage and log out the user
   */
  logout() {
    this.userService.logout();
  }

  /**
   *  redirects user to Caremada's help page
   */
  redirectHelp() {
    const url = "https://help.caremada.com/en";
    window.open(url);
  }

  /**
   *  Presents alert dialog, giving information about the application 
   */
  async about() {

    console.log("clicked");

    let alert = this.alertController.create({
      message: 'Drivemada is an uber-like application that is intended to be used by service providers to provide services. ',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    (await alert).present();

  }
}
