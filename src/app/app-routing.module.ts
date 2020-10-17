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
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
