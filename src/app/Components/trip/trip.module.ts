import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { TripComponent  } from './trip.component';
import { RequestService } from 'src/app/Services/requests.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: TripComponent
            }
        ])
    ],
    declarations: [TripComponent],
    providers: [RequestService]
})
export class TripComponentModule {
}