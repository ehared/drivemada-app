import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor, Plugins, GeolocationPosition } from '@capacitor/core'
import { Vehicle } from 'android/app/build/intermediates/merged_assets/debug/out/public/app/Models/vehicle';
import { map } from 'rxjs/operators';
import { CURRENT_REQUEST_KEY, CURRENT_USER_KEY, VEHCILE_KEY } from 'src/app/Models/cacheKeys';
import { Request } from 'src/app/Models/request';
import { User } from 'src/app/Models/user';
import { StorageService } from 'src/app/Services/storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { RequestService } from 'src/app/Services/requests.service';
declare var google: any;

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss'],
})
export class DriveComponent implements OnInit, OnDestroy {

  map;
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef;
  request: Request = new Request;
  vehicle: Vehicle = new Vehicle;
  user: User = new User;
  infoWindow: any = [];
  latitude: any;
  longitude: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  destination: any;
  currentPositionLatLng: any;
  loading: boolean = false;

  constructor(public activatedRoute: ActivatedRoute, public storageService: StorageService, public geolocation: Geolocation, public requestService: RequestService, private router: Router) {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe((result: Request) => {

      if (result.id) {
        this.request = result;
        this.storageService.setKey(CURRENT_REQUEST_KEY, result);
      } else {
        this.storageService.getValue(CURRENT_REQUEST_KEY).then((result: Request) => {
          this.request = result;
        })
      }
      this.storageService.getValue(CURRENT_USER_KEY).then((result: User) => {
        this.user = result;
      });

      this.storageService.getValue(VEHCILE_KEY).then((result: Vehicle) => {
        this.vehicle = result;
      })
    });
    this.loading = true;
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loading = false;
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.setMap();
      this.currentPositionLatLng = new google.maps.LatLng(this.latitude, this.longitude);
      var destinationLatLng = new google.maps.LatLng(this.request.latitude, this.request.longitude);
      
      this.geocodeAddress();
      // this.setDirectionsRoute(source, destination);

    }).catch((error) => {
      console.log(error);
      this.setMap();
    });

    console.log(this.request);
  }

  ngOnDestroy() { }

  setMap(): void {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: { lat: this.latitude ? this.latitude : 45.355178, lng: this.longitude ? this.longitude : -75.760774 },
        zoom: 16,
        disableDefaultUI: true
      });
    this.directionsDisplay.setMap(this.map);
  }
  
  setDirectionsRoute(source, destination) {
    const waypts = [];
    waypts.push({
      location: new google.maps.LatLng(this.request.latitude, this.request.longitude),
      stopover: true,
    });

    this.directionsService.route({
      origin: source,
      destination: destination,
      waypoints: waypts,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);

        this.directionsDisplay.getMap();
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  geocodeAddress() {
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({
      'address': this.request.destinationAddress,
    },
      (results, status) => {
        if (status === 'OK') {
          let start = results[0].geometry.location
          this.destination = new google.maps.LatLng(start.lat(), start.lng())
          this.setDirectionsRoute(this.currentPositionLatLng, this.destination);
        }        
      });
  }

  startTrip(){
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.latitude},${this.longitude}&waypoints=${this.request.latitude},${this.request.longitude}&destination=${this.destination.lat()}, ${this.destination.lng()}&travelmode=driving`
    window.open(url);
  }

  completedTrip() {
    this.request.driverId = this.user.id;
    this.request.completionDate = new Date().toISOString();

    this.requestService.update(this.request).subscribe(() => {
      this.router.navigateByUrl('requests');
    });
    
  }
}
