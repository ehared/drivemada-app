/**
 * Filename: trip.component.ts
 * Purpose: Creates the trip component which lists out a list of completed trips by the user
 * Author: Eltire Hared
 */
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/Services/requests.service';
import { CURRENT_USER_KEY } from 'src/app/Models/cacheKeys';
import { User } from 'src/app/Models/user';
import { StorageService } from 'src/app/Services/storage.service';
import { Request } from 'src/app/Models/request'
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {

  toggle: boolean = false;
  user: User = new User; // user
  requests: Request[] = []; // list of completed trips

  /**
   * Constructor
   * @param storageService - storage service used to grab the current user
   * @param requestService - request service used to get the list of trips completed by the driver
   * @param menuController  - enables and disables the side menu
   */
  constructor(public activatedRoute: ActivatedRoute, public storageService: StorageService, public requestService: RequestService, public menuController: MenuController) {

    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(() => {
     
      /* retrieve the user from local storage */
      this.storageService.getValue(CURRENT_USER_KEY).then((result: User) => {
        
        if (result.id) {
          this.user = result;
          this.getRequests();
        }
      });
    });


  }

  ngOnInit() { }

  /**
   *  Retrieves a list of completed requests
   */
  getRequests() {
    
    this.requestService.getTrips(this.user.id).subscribe((response: Request[]) => {
    
      this.requests = response;
    });
  }



}
