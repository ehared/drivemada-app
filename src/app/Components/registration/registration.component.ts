import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core'
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/userService';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {share} from 'rxjs/operators';

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
    confirmPass : '',
    isConfirmed: false,
  }
  

  constructor(public router: Router,
    private http: HttpClient, private userService: UserService, private toastrService: ToastrService) { }

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
  signUp(form:any) {
    /*
       this.http.post('https://localhost:44397/api/registration', this.driver).subscribe((res) => {
       console.log(res)
       this.router.navigateByUrl('welcome');
     });
    */
    console.log(this.user);
    var formData = this.userService.jsonToFormData(this.user);
    this.userService.create(formData).pipe(share()).subscribe((response: any)  => {
      console.log(this.user);
      this.router.navigateByUrl('login');
      console.log("User was created. Check DB");
      this.toastrService.success("Please check your email to validate your account.");
    },(err) =>{
        if(err.status === 400){
          console.log("Email already exists");
        }
        if(err.status === 500) {
          console.log("Error occured while trying to create account");
        }
    });

  }
  goBackToLogin() {
    this.router.navigateByUrl('welcome');
  }
  getAge (dateOfBirth: string){

    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();

    console.log(age);
  }

}
