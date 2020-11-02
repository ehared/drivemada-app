import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/userService';
import {share} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class LoginComponent {

  user = new User;
  show: boolean = false;
  constructor(public router: Router, private userService: UserService, private toastrService: ToastrService) { }

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
  login(){
    var userForm = this.userService.jsonToFormData(this.user);
    this.userService.login(userForm).pipe(share()).subscribe((response: any)=>{
      this.toastrService.success("Successfully logged in.","Login", {timeOut:3000,});
      console.log("Successfully Logged in.");
      console.log(response.data);
    },err => {
      console.log(err);
    })
  }
}
