import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {EditPasswordComponent} from './edit-password.component';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
		HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                component: EditPasswordComponent
            }
        ])
    ],
    declarations: [EditPasswordComponent]
})
export class EditPasswordComponentModule {
}