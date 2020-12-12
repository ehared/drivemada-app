import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Storage } from '@ionic/storage'
import { Item, StorageService } from 'src/app/Services/storage.service';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { share } from 'rxjs/operators';
import { Vehicle } from 'src/app/Models/vehicle';
import { UtilService } from 'src/app/Services/util.service';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/Services/user.service';

declare var google: any;
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class VehicleComponent implements OnInit {

  map;
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef;
  user: User = new User();
  item: Item = <Item>{};
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle;

  constructor(private userService: UserService, private alertCtrl: AlertController, private storage: StorageService, private router: Router, private vehService: VehicleService, private utilService: UtilService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(() => {
      this.storage.get("user").then((item) => {
        if (item) {
          this.user = JSON.parse(item.value);
          //debugger
          this.vehService.get(this.user.id).subscribe((response: Vehicle[]) => {
            if (response) {
              this.vehicles = response;
            }
          });
        }
      });
    });
  }

  ngOnInit() { }


  //  setMap(): void {
  //     this.map = new google.maps.Map(
  //       this.mapElement.nativeElement,
  //       {
  //         center:{lat: 45.355178, lng: -75.760774 },
  //         zoom: 16
  //       });

  //   }
  onSelect(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    console.log("Selected: " + this.selectedVehicle.id);

  }

  onDelete(vehicle: Vehicle) {
    //debugger;
    console.log("Deleting vehicle with id= " + vehicle.id);

    this.vehService.delete(vehicle.id).subscribe(() => {
      this.deleteVehicleFromList(vehicle.id);
    });


  }
  onEdit(vehicle: Vehicle) {

    this.router.navigateByUrl('addVehicle', { state: vehicle });

  }

  deleteVehicleFromList(id: number) {
    const indexToRemove = this.vehicles.map(item => item.id).indexOf(id);
    this.vehicles.splice(indexToRemove, 1);
  }
}
