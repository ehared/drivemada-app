import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileComponent } from './profile.component';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent]
})
export class ProfilePageModule {}
