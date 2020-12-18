/**
 * Filename: drive.ts
 * Purpose: Generates drive component, where a user can see the route of the request they accepted on a google map. The user can start the trip which will then launch google maps for step by step navigation
 * Author: Eltire Hared
 */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/Models/vehicle';
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

  /* Global variables */
  map; // google map
  @ViewChild('mapElement', { static: true }) mapElement: ElementRef;
  request: Request = new Request; // the selected request
  vehicle: Vehicle = new Vehicle; // the selected vehicle
  user: User = new User;  // the user requested the trip
  infoWindow: any = [];
  latitude: any;
  longitude: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  destination: any;
  currentPositionLatLng: any;
  loading: boolean = false;

  /**
   * Constructor of the drive component
   * @param activatedRoute - provided the request object, selected from the list of requests
   * @param storageService  - storage service to retrieve stored values from local storage
   * @param geolocation  - used to geocode the driver's current location
   * @param requestService  - request service to make http calls
   * @param router  - the router used to navigate to other pages
   */
  constructor(public activatedRoute: ActivatedRoute, public storageService: StorageService, public geolocation: Geolocation, public requestService: RequestService, private router: Router) {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe((result: Request) => {
      if (result.id) { // request found
        this.request = result;
        this.storageService.setKey(CURRENT_REQUEST_KEY, result);
      } else { // check to see if its in storage
        this.storageService.getValue(CURRENT_REQUEST_KEY).then((result: Request) => {
          this.request = result;
        })
      }

      this.storageService.getValue(CURRENT_USER_KEY).then((result: User) => { // retrieve the current user from storage
        this.user = result;
      });

      this.storageService.getValue(VEHCILE_KEY).then((result: Vehicle) => { // retrieve the selected vehicle from local storage
        this.vehicle = result;
      })
    });
    this.loading = true;
  }

  /**
   * Rendered when the component starts, gets the current position of the driver and centers the map to that location
   */
  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => { // locate the driver's current location
      // location was found successfully, set latitude and longitude from the response body
      this.loading = false;
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.setMap(); // draw the map on the UI
      this.currentPositionLatLng = new google.maps.LatLng(this.latitude, this.longitude);

      this.geocodeAddress();

    }).catch((error) => {
      console.log(error);
      this.setMap();
    });

    console.log(this.request);
  }

  ngOnDestroy() { }
  /**
   * Draws the map, and zooms in on the current location or algonquin college if the current location was not set
   */
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
  /**
   * Calculates the route to be displayed using source address, waypoint, and destination address.
   * @param source - source address
   * @param destination  - destination address
   */
  setDirectionsRoute(source, destination) {
    const waypts = [];
    waypts.push({ // waypoint - client's source destination
      location: new google.maps.LatLng(this.request.latitude, this.request.longitude),
      stopover: true,
    });

    this.directionsService.route({ // calculate the route to draw on the google map
      origin: source,
      destination: destination,
      waypoints: waypts,
      travelMode: 'DRIVING'
    }, (response, status) => {

      if (status === 'OK') { // route successfully calculated
        this.directionsDisplay.setDirections(response);

        this.directionsDisplay.getMap();
      } else { // error occured trying to calculate route
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  /**
   * Calculates addresses using longitude and latitude 
   */
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

  /* opens google map with the calculated route */
  startTrip() {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.latitude},${this.longitude}&waypoints=${this.request.latitude},${this.request.longitude}&destination=${this.destination.lat()}, ${this.destination.lng()}&travelmode=driving`
    window.open(url);
  }
  /**
   * Updates the request as completed 
   */
  completedTrip() {
    this.request.driverId = this.user.id;
    this.request.completionDate = new Date().toISOString(); // set completion date

    this.requestService.update(this.request).subscribe(() => {
      this.router.navigateByUrl('requests');
      this.storageService.deleteKey(CURRENT_REQUEST_KEY);
    });

  }
}
