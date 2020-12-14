import { Component, OnInit } from '@angular/core';
import { RouterEvent } from '@angular/router';
import {Router} from '@angular/router'
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent{

  constructor(public router: Router, public menuController: MenuController) { 
    this.menuController.enable(false);
  }

  login(){
    this.router.navigateByUrl('login');
  }

  signUp() {
    this.router.navigateByUrl('registration');
  }
 
}
