import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {DriveComponent} from './drive.component';
import {Geolocation} from '@ionic-native/geolocation/ngx'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: DriveComponent
            }
        ])
    ],
    declarations: [DriveComponent],
    providers: [
        Geolocation
    ]
})
export class DriveComponentModule {
}
