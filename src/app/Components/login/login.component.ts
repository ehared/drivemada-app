import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';
import { share } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from 'src/app/Services/util.service';
import { Item, StorageService } from 'src/app/Services/storage.service';
import { Storage } from '@ionic/storage'
import { VehicleService } from 'src/app/Services/vehicle.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class LoginComponent {

  user = new User;
  show: boolean = false;
  item: Item = <Item>{};
  isDriver: boolean = false;

  /**
   * The constructor for LoginComponent
   * @param router - the router object used to navigate
   * @param userService - service to make api calls regarding a user 
   * @param utilService - service to create alerts, toasts or print messages to the console
   */
  constructor(public router: Router, private userService: UserService, private utilService: UtilService, private storageServ: StorageService, private vehService: VehicleService) { }

  /**
   * Shows or hides the password entered into the password field
   */
  showPassword() {
    this.show = !this.show;
    var showPass = document.getElementById('password-input');

    if (this.show) {
      showPass.setAttribute('type', 'text');
    } else {
      showPass.setAttribute('type', 'password');
    }
    console.log("clicked!");
  }
  /**
   * checks the database for the user, if successful logs the user in 
   * 
   */
  login() {
    var userForm = this.utilService.jsonToFormData(this.user);
    this.userService.login(userForm).pipe(share()).subscribe((response: any) => {
      /* log in was successful */
      this.utilService.presentToast("Log in successful.");
      let token = response.data['token'];
      this.item.key = "user";
      this.item.value = JSON.stringify(response.data['user']);
      this.user = response.data["user"];
      this.storageServ.add(this.item);
      this.userService.loggedIn(token);

     this.checkDriver();
    }, err => {
      /* log in was unsuccesful */
      this.utilService.presentToast("Unsuccessful login. Please check your email or password");
    })
  }
  checkDriver() {
    this.vehService.get(this.user.id).pipe(share()).subscribe((response: any) => {
   
      if(response){ // user already registered a vehicle
        console.log(response);
        this.router.navigateByUrl('vehicle');
      }
      else {
        this.router.navigateByUrl('addVehicle');
      }
      
    }, err=> {
      this.router.navigateByUrl('addVehicle');
    });
  }
}
