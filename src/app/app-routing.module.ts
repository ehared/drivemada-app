import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
},
{
    path: 'welcome',
    loadChildren: 'src/app/Components/welcome/welcome.module#WelcomeComponentModule'
},
{
  path: 'registration',
  loadChildren: 'src/app/Components/registration/registration.module#RegistrationComponentModule'
},
{
  path: 'login',
  loadChildren: 'src/app/Components/login/login.module#LoginComponentModule'
},
{
  path: 'settings',
  loadChildren: 'src/app/Components/settings/settings.module#SettingsComponentModule'
},
{
  path: 'editAcct',
  loadChildren: 'src/app/Components/edit-acct/edit-acct.module#EditAcctComponentModule'
},
{
  path: 'vehicle',
  loadChildren: 'src/app/Components/vehicle/vehicle.module#VehicleComponentModule'
},
{
  path: 'addVehicle',
  loadChildren: 'src/app/Components/vehicle/vehicle.add.module#VehicleAddComponentModule'
},
{
  path: 'requests',
  loadChildren: 'src/app/Components/request/request.module#RequestComponentModule'
},
{
  path: 'drive',
  loadChildren: 'src/app/Components/drive/drive.module#DriveComponentModule'
},
{
  path: 'trips',
  loadChildren: 'src/app/Components/trip/trip.module#TripComponentModule'
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
