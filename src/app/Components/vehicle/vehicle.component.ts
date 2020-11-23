import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import {Storage} from '@ionic/storage'

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {

  user:User = new User();

  constructor(private storage: Storage, private router: Router) { 
     
  }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      
      if(val) {
        
        this.user = JSON.parse(val);
        //this.ref.detectChanges();
        console.log(this.user.firstName);
      }
      else {
        this.router.navigateByUrl('welcome');
      }
    });
   
  }

}
