import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CURRENT_USER_KEY } from 'src/app/Models/cacheKeys';
import { User } from 'src/app/Models/user';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.service';
import { UtilService } from 'src/app/Services/util.service';
import { MenuController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class EditPasswordComponent implements OnInit {

  user: User = new User;
  currentPassword: string;
  newPassword: string;
  show_current: boolean = false;
  show_new: boolean = false;

  constructor(public router: Router, public storageService: StorageService, public userService: UserService, private utilService: UtilService, public menuController: MenuController) {

    this.menuController.enable(true);

    this.storageService.getValue(CURRENT_USER_KEY).then((response: any) => {
      if (response) {
        this.currentPassword = this.user.password;
        this.newPassword = this.newPassword;
      }

    })

  }

  ngOnInit() {
    this.currentPassword = this.user.password;
  }

  /**
   * Shows or hides the password entered into the password field
   */
  showCurrentPassword() {
    this.show_current = !this.show_current;
    var showPass = document.getElementById('current-password');

    if (this.show_current) {
      showPass.setAttribute('type', 'text');
    } else {
      showPass.setAttribute('type', 'password');
    }
    console.log("clicked!");
  }

  showNewPassword() {
    this.show_new = !this.show_new;
    var showPass = document.getElementById('new-password');

    if (this.show_new) {
      showPass.setAttribute('type', 'text');
    } else {
      showPass.setAttribute('type', 'password');
    }
    console.log("clicked!");
  }

  goBackToSettings() {
    this.router.navigateByUrl('settings');
  }

  
/**
 * 
 */
  UpdateForm() {

    let password = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    }
    this.userService.updateCredentials(password).subscribe((response: any) => {
      console.log("response: " + password);
    }, err => {
      /* log in was unsuccesful */
      if (err.status == 401) {
        this.utilService.presentToast("Unsuccessful Password change!");
      }
    })
    this.utilService.presentToast("Password changed successfully!");

    this.goBackToSettings();


  }

}
