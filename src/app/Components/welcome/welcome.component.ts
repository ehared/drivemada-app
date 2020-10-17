import { Component, OnInit } from '@angular/core';
import { RouterEvent } from '@angular/router';
import {Router} from '@angular/router'
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent{

  constructor(public router: Router) { }

  login(){
    this.router.navigateByUrl('login');
  }

  signUp() {
    this.router.navigateByUrl('registration');
  }
 
}
