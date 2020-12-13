import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ToastController} from "@ionic/angular"
import { CURRENT_USER_KEY, VEHCILE_KEY } from 'src/app/Models/cacheKeys';
import { StorageService } from 'src/app/Services/storage.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(public router: Router, public tstCntlr: ToastController, public userService: UserService ) { }

  ngOnInit() {}

  goEditAcct(){
    this.router.navigateByUrl('editAcct');
  }
  logout(){
    this.userService.logout();
  }

}
