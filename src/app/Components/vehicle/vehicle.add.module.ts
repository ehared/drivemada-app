import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { VehicleAddComponent } from './vehicle.add.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: VehicleAddComponent
            }
        ])
    ],
    declarations: [VehicleAddComponent]
})
export class VehicleAddComponentModule {
}