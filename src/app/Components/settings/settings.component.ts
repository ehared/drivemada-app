import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ToastController} from "@ionic/angular"
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(public router: Router, public tstCntlr: ToastController ) { }

  ngOnInit() {}

  goEditAcct(){
    this.router.navigateByUrl('editAcct');
  }
  logout(){
    this.router.navigateByUrl('welcome');
  }

}
