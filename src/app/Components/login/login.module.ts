import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login.component'

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,

    ],
    declarations: [LoginComponent]
})
export class LoginModule {

}