import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    licensePlate: string,
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
    licensePlate: '',
    isAvailable: false,
  };

  carMakes: any [] = [{name:'Honda'}, {name:'Kia'}, {name:'Toyota'}, {name:'Hyundai'}, {name:'Chevrolet'},{name:'BMW'},{name:'Acura'}];

  constructor(public router: Router) {}
  
  signUp() {
    console.log("We have made a driver!!!!");
  }
  goBacktoLogin(){
    this.router.navigateByUrl('welcome');
  }

}
