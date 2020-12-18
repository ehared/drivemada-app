/**
 * Filename: welcome.component.ts
 * Purpose: Generates the welcoome component, which is first launched on startup.
 * Author: Eltire Hared
 */
import { Component, OnInit } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { Router } from '@angular/router'
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {

  /**
   * Constructor
   * @param router - router to navigate to either the login page or registration page 
   * @param menuController  - enables or disables menu
   */
  constructor(public router: Router, public menuController: MenuController) {
    this.menuController.enable(false);
  }
  /**
   *  Navigates to the login page
   */
  login() {
    this.router.navigateByUrl('login');
  }
  /**
   *  Navigates to the registration page
   */
  signUp() {
    this.router.navigateByUrl('registration');
  }

}
