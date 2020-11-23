import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Storage } from '@ionic/storage'
import { Item, StorageService } from 'src/app/Services/storage.service';
import { Vehicle } from 'src/app/Models/vehicle';
import { UtilService } from 'src/app/Services/util.service';
import { NgForm } from '@angular/forms';
import { VehicleComponent } from './vehicle.component';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { share } from 'rxjs/operators';

@Component({
    selector: 'app-vehicle-add',
    templateUrl: './vehicle.add.component.html',
    styleUrls: ['./vehicle.add.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class VehicleAddComponent implements OnInit {


    vehicle = new Vehicle;
    user = new User;
    userFound: boolean = false;

    constructor(private router: Router, private utilService: UtilService, private storage: StorageService, private vService: VehicleService) { }
    ngOnInit() {
        this.storage.get("user").then((item) => {
            if(item){
              this.user = JSON.parse(item.value);
              this.userFound = true;
              this.vehicle.userId = this.user.id;
            }
          })
    }
    goBackVehicles() {
        this.router.navigateByUrl('vehicle');
    }
    addVehicle(form: NgForm) {

        console.log(this.vehicle);
        
        if(this.userFound){
            this.vService.create(this.vehicle).pipe(share()).subscribe((response: any) => {
                this.utilService.presentToast("Vehicle added successfully.");
                this.router.navigateByUrl('vehicle');
    
            }, err => {
                this.utilService.presentToast("Unable to add vehicle");
            });
        }
        
        form.reset();
    }

}