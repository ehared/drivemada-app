import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Item, StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/Services/util.service';

@Component({
  selector: 'app-edit-acct',
  templateUrl: './edit-acct.component.html',
  styleUrls: ['./edit-acct.component.scss', '../../../assets/scss/purpose-dark.scss'],
})

export class EditAcctComponent {

  id: any;
  firstName: any;
  lastName: any;
  area: any;
  city: any;
  country: any;
  postalCode: any;
  about: any;
  phone: any = '';
  addressLine1: any = '';
  addressLine2: any = '';
  update_data: any;
  user: User = new User;
  token: string;
  item: Item = <Item>{};

  /**
   * Constructor for Edit account component.
   * @param router - the router object used to navigate
   * @param storageService - service to store user information 
   * @param utilService - service to create alerts, toasts or print messages to the console
   * @param userService - service to make api calls regarding a user
   */
  constructor(private router: Router, public storageService: StorageService, private utilService: UtilService, public userService: UserService) {

    this.userService.getSelf().subscribe((response: any) => {
      /* Storing form data to user object */
      if (response) {
        this.user.id = response.data['id'];
        this.user.firstName = response.data['firstName'];
        this.user.lastName = response.data['lastName'];
        this.user.email = response.data['email'];
        this.user.phoneNumber = response.data['phone'];
        this.user.addressLine1 = response.data['location']['addressLine1'];
        this.user.addressLine2 = response.data['location']['addressLine2'];
        this.user.city = response.data['location']['city'];
        this.user.postalCode = response.data['location']['postalCode'];
        this.user.area = response.data['location']['area'];
        //console.log(this.user);
      }

    }, () => {

    });
  }

  /**
   * Navigates to settings page
   */
  goBackToSettings() {
    this.router.navigateByUrl('settings');
  }

  /**
   * Stores form informationinto json and sends it to backend with header
   */
  UpdateForm() {
    this.userService.updateUser(this.user).subscribe((response: any) => {
      console.log("response: " + response);
    }, err => {
      /* Password change was unsuccesful */
      if (err.status == 401) {
        this.utilService.presentToast("Unauthorized");
      }
    })
    this.goBackToSettings();
  }
}