import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { Item, StorageService } from 'src/app/Services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-acct',
  templateUrl: './edit-acct.component.html',
  styleUrls: ['./edit-acct.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class EditAcctComponent implements OnInit {

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

  constructor(private router: Router, public storageService: StorageService, public userService: UserService) {


    this.userService.getSelf().subscribe((response: any) => {
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

    /* grab current user from storageService , var result */
  }


  ngOnInit() { }

  back() {
    this.router.navigateByUrl('settings');
  }

  goBackToSettings() {
    this.router.navigateByUrl('settings');
  }

  editAccount() {
    this.router.navigateByUrl('settings');
  }

  UpdateForm() {


    this.userService.updateUser(this.user).subscribe((response: any) => {
      console.log("response: " + response);
    })

    

    

    this.back();

  }

}