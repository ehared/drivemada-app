import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import {Storage} from '@ionic/storage'
import { Item, StorageService } from 'src/app/Services/storage.service';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { share } from 'rxjs/operators';
import { Vehicle } from 'src/app/Models/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class VehicleComponent implements OnInit {

  user: User = new User();
  item: Item = <Item>{};
  vehicle: Vehicle = new Vehicle();

  constructor(private storage: StorageService, private router: Router, private vehService: VehicleService) { 
     
  }

  ngOnInit() {
    
    this.storage.get("user").then((item) => {
      if(item){
        this.user = JSON.parse(item.value);
        this.vehService.get(this.user.id).pipe(share()).subscribe((response: any) => { 
          if(response){
            this.vehicle = response;
          }
        });
      }
    })

    
   
  }
  addVehicle(){
    this.router.navigateByUrl('addVehicle');
  }

}
