import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {EditAcctComponent} from './edit-acct.component';
import { HttpModule, Response } from '@angular/http';
import { HttpClientModule, HttpClientXsrfModule, HttpClient } from  '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
		HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                component: EditAcctComponent
            }
        ])
    ],
    declarations: [EditAcctComponent]
})
export class EditAcctComponentModule {
}