/**
 * Filename: vehicle.add.component.ts
 * Purpose: Generates the add/edit vehicle component.
 * Author: Eltire Hared
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Storage } from '@ionic/storage'
import { Item, StorageService } from 'src/app/Services/storage.service';
import { Vehicle } from 'src/app/Models/vehicle';
import { UtilService } from 'src/app/Services/util.service';
import { NgForm } from '@angular/forms';
import { VehicleComponent } from './vehicle.component';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CURRENT_USER_KEY } from 'src/app/Models/cacheKeys';

@Component({
    selector: 'app-vehicle-add',
    templateUrl: './vehicle.add.component.html',
    styleUrls: ['./vehicle.add.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class VehicleAddComponent implements OnInit {

    vehicle: Vehicle = new Vehicle; // vehicle to be added/ updated
    user = new User; // the user currently logged in
    userFound: boolean = false;
    isEditMode: boolean = false;
    sizes: string[] = ['Drive X', 'Drive XL'];


    /**
     * Constructor
     * @param router - router to navigate between pages 
     * @param utilService  - util service to present alerts, toasts or messages to the console.
     * @param storageService - storage service to grab information from local storage
     * @param vService  - vehicle service to make http calls relating to a vehicle
     * @param activatedRoute  - provides the vehicle information carried in the route
     */
    constructor(private router: Router, private utilService: UtilService, private storageService: StorageService, private vService: VehicleService,
        private activatedRoute: ActivatedRoute) { }

    /**
     *  Checks to see if a vehicle was passed through the router.
     */
    ngOnInit() {
        this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe((result: Vehicle) => {
            if (result.id) { // vehicle was found, we are updating a vehicle
                this.vehicle = result;
                this.isEditMode = true;
            } else { // no vehicle found, we are adding a vehicle
                this.vehicle = {} as Vehicle;
                this.isEditMode = false;
            }
        })

        this.storageService.getValue(CURRENT_USER_KEY).then((item) => { // retrieve the current user from local storage
            if (item) {
                this.user = item;
                this.userFound = true;
            }
        })
    }
    /**
     *  Navigate back to vehicle component
     */
    goBackVehicles() {
        this.router.navigateByUrl('vehicle');
    }
    /**
     *  Adds a vehicle to the account
     * @param form form containing the vehicle information
     */
    addVehicle(form: NgForm) {
        if (this.userFound) { // user is found
            if (this.isEditMode) { // we are updating an existing vehicle
                this.vService.update(this.vehicle).subscribe((response: any) => {
                    this.utilService.presentToast("Vehicle was edited successfully.");
                    this.router.navigateByUrl('vehicle');

                }, err => {
                    this.utilService.presentToast("Unable to edit vehicle");
                });
            } else { // we are adding a vehicle to the account
                this.vService.create(this.user.id, this.vehicle).subscribe((response: any) => {
                    this.utilService.presentToast("Vehicle added successfully.");
                    this.router.navigateByUrl('vehicle');

                }, err => {
                    this.utilService.presentToast("Unable to add vehicle");
                });
            }
        }

        form.reset(); // reset the form
    }

}