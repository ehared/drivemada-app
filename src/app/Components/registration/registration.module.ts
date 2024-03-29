import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {RegistrationComponent} from './registration.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                component: RegistrationComponent
            }
        ])
    ],
    declarations: [RegistrationComponent]
})
export class RegistrationComponentModule {
}
