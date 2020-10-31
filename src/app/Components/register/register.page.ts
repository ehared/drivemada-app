import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
