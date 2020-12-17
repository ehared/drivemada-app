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

  constructor(public router: Router, public tstCntlr: ToastController, public userService: UserService, public alertController: AlertController) { }

  ngOnInit() { }

  goEditAcct() {
    this.router.navigateByUrl('editAcct');
  }

  goEditPassword(){
    this.router.navigateByUrl('editPassword');
  }
  logout(){
    this.userService.logout();
  }
  redirectHelp() {
    const url = "https://help.caremada.com/en";
    window.open(url);
  }

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
