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

    vehicle: Vehicle = new Vehicle;
    user = new User;
    userFound: boolean = false;
    isEditMode: boolean = false;
    sizes: string[] = ['Drive X', 'Drive XL'];

    constructor(private router: Router, private utilService: UtilService, private storageService: StorageService, private vService: VehicleService,
        private activatedRoute: ActivatedRoute) { }
    ngOnInit() {
        this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe((result: Vehicle) => {
            if (result.id) {
                this.vehicle = result;
                this.isEditMode = true;
            }else {
                this.vehicle = {} as Vehicle;
                this.isEditMode = false;
            }            
        })
        
        this.storageService.getValue(CURRENT_USER_KEY).then((item) => {
            if(item){
              this.user = item;
              this.userFound = true;
            }
          })
    }
    goBackVehicles() {
        this.router.navigateByUrl('vehicle');
    }
    addVehicle(form: NgForm) {
        if (this.userFound){
            if (this.isEditMode) {
                this.vService.update(this.vehicle).subscribe((response: any) => {
                    this.utilService.presentToast("Vehicle was edited successfully.");
                    this.router.navigateByUrl('vehicle');
        
                }, err => {
                    this.utilService.presentToast("Unable to edit vehicle");
                });
            } else {
                this.vService.create(this.user.id,this.vehicle).subscribe((response: any) => {
                    this.utilService.presentToast("Vehicle added successfully.");
                    this.router.navigateByUrl('vehicle');
        
                }, err => {
                    this.utilService.presentToast("Unable to add vehicle");
                });        
            }            
        }
        
        form.reset();
    }

}