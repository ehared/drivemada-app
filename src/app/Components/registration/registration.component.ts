import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgModule} from '@angular/core'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {

  driver: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    carMake: string,
    carModel: string,
    carColor: string,
    carPlate: string,
    isAvailable: boolean,
  } = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    carMake: '',
    carModel: '',
    carColor: '',
    carPlate: '',
    isAvailable: false,
  };

  carMakes: any [] = [{name:'Honda'}, {name:'Kia'}, {name:'Toyota'}, {name:'Hyundai'}, {name:'Chevrolet'},{name:'BMW'},{name:'Acura'}];

  constructor(public router: Router,
    private http: HttpClient) {}
  
  signUp(form: any) {
    this.http.post('https://localhost:44397/api/registration', this.driver).subscribe((res) => {
      console.log(res)
      this.router.navigateByUrl('welcome');
    });
    
  }
  goBacktoLogin(){
    this.router.navigateByUrl('welcome');
  }

}
