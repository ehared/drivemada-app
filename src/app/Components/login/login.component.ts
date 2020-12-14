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
import { MenuController } from '@ionic/angular';
import { CURRENT_USER_KEY } from 'src/app/Models/cacheKeys';


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
  constructor(public router: Router, private userService: UserService, private utilService: UtilService, private storageService: StorageService, private vehService: VehicleService, public menuController: MenuController) { 
    this.menuController.enable(false);
  }

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
      this.storageService.setKey(CURRENT_USER_KEY, this.user); // add user to the local storage
      this.userService.loggedIn(token); // set the user to logged in

     this.checkDriver();
    }, err => {
      /* log in was unsuccesful */
      if(err.status == 404){
        this.utilService.presentToast("Unsuccessful login. Please check your email or password");
      } else if (err.status === 500 || err.status === 503){
        this.utilService.presentToast("Server error occured.");
      } else{
        this.utilService.presentToast("Unable to login.");
      }
      
    })
  }
  checkDriver() {
    this.vehService.get(this.user.id).subscribe((response: any) => {
   
      if(response){ // user already registered a vehicle
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
