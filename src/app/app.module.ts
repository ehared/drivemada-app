import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ToastrModule} from 'ngx-toastr'
import {UserService} from 'src/app/Services/user.service'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilService } from './Services/util.service';
import { IonicStorageModule } from '@ionic/storage'
import { StorageService } from './Services/storage.service';
import { VehicleService } from './Services/vehicle.service';
import {RequestService} from './Services/requests.service'
import { Geolocation } from '@capacitor/core';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    IonicStorageModule.forRoot()
    
  ],
  providers: [
    UserService,
    UtilService,
    StorageService,
    VehicleService,
    RequestService,
    StatusBar,   
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
