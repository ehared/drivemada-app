import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import {Storage} from '@ionic/storage'
import { Item, StorageService } from 'src/app/Services/storage.service';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { share } from 'rxjs/operators';
import { Vehicle } from 'src/app/Models/vehicle';

declare var google: any;
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class VehicleComponent implements OnInit {

  map;
  @ViewChild('mapElement', {static: true}) mapElement : ElementRef;
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
    this.setMap();
    
   
  }
 setMap(): void {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center:{lat: 45.355178, lng: -75.760774 },
        zoom: 16
      });
    
  }
  addVehicle(){
    this.router.navigateByUrl('addVehicle');
  }

}
