/**
 * FIlename: vehicle.component.ts
 * Purpose: Generates vehicle component and lists the users vehicle(s).
 * Author: Eltire Hared
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Item, StorageService } from 'src/app/Services/storage.service';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { Vehicle } from 'src/app/Models/vehicle';
import { MenuController } from '@ionic/angular';
import { CURRENT_USER_KEY } from 'src/app/Models/cacheKeys';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class VehicleComponent implements OnInit {

  user: User = new User();
  item: Item = <Item>{};
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle;

  /**
   * 
   * @param storage - storage service to retrive or add information to local storage
   * @param router  - router used to navigate through the pages
   * @param vehService  - vehicle service to make http calls regarding vehicle
   * @param activatedRoute  - provides information on whats being passed along with the router
   * @param menuController  - enables or disables the side menu
   */
  constructor(private storage: StorageService, private router: Router, private vehService: VehicleService, private activatedRoute: ActivatedRoute, private menuController: MenuController) {
    this.activatedRoute.params.subscribe(() => {
      this.storage.getValue(CURRENT_USER_KEY).then((item: User) => {
        if (item) { // found user
          this.user = item;
          this.vehService.get(this.user.id).subscribe((response: Vehicle[]) => { // retrieve user's vehicle(s)
            if (response) { // vehicle(s) exist
              this.vehicles = response;
            }
          });
        }
      });
    });

    this.menuController.enable(true);
  }

  ngOnInit() { }

  /**
   *  Navigates to the requests component when a vehicle has been selected
   * @param vehicle  - selected vehicle
   */
  onSelect(vehicle: Vehicle) {

    console.log("Selected: " + vehicle.id);

    if (vehicle != null) {
      this.router.navigateByUrl('requests', { state: vehicle });
    }

  }
  /**
   *  Deleltes vehicle from the user's account
   * @param vehicle  - vehicle being deleted
   */
  onDelete(vehicle: Vehicle) {
    console.log("Deleting vehicle with id= " + vehicle.id);

    this.vehService.delete(vehicle.id).subscribe(() => {
      this.deleteVehicleFromList(vehicle.id); // call to remove vehicle from vehicle list
    });
  }

  /**
   *  Passes the vehicle to be updates along with the route, navigates to the edit vehicle page
   * @param vehicle - vehicle to update
   */
  onEdit(vehicle: Vehicle) {

    this.router.navigateByUrl('addVehicle', { state: vehicle });

  }

  /**
   * Deletes a vehicle from the list
   * @param id  - id of the vehicle to delete from the list
   */
  deleteVehicleFromList(id: number) {
    const indexToRemove = this.vehicles.map(item => item.id).indexOf(id);
    this.vehicles.splice(indexToRemove, 1);
  }
}
