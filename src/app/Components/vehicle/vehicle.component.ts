import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Storage } from '@ionic/storage'
import { Item, StorageService } from 'src/app/Services/storage.service';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { share } from 'rxjs/operators';
import { Vehicle } from 'src/app/Models/vehicle';
import { UtilService } from 'src/app/Services/util.service';
import { AlertController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/Services/user.service';
import { CURRENT_USER_KEY } from 'src/app/Models/cacheKeys';

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
    private activatedRoute: ActivatedRoute, private menuController: MenuController) {
    this.activatedRoute.params.subscribe(() => {
      this.storage.getValue(CURRENT_USER_KEY).then((item: User) => {
        if (item) {
          this.user = item;
          //debugger
          this.vehService.get(this.user.id).subscribe((response: Vehicle[]) => {
            if (response) {
              this.vehicles = response;
            }
          });
        }
      });
    });

    this.menuController.enable(true);
  }

  ngOnInit() { }

  onSelect(vehicle: Vehicle) {
    
    console.log("Selected: " + vehicle.id);

    if(vehicle != null){
      this.router.navigateByUrl('requests', { state: vehicle });
    }

  }

  onDelete(vehicle: Vehicle) {
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
