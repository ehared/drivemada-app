/**
 * Filename: request.component.ts
 * Purpose: Generates request component which lists out the available requests made from users of the Caremada application.
 * Author: Eltire Hared
 */
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Vehicle } from 'src/app/Models/vehicle';
import { RequestService } from 'src/app/Services/requests.service';
import { Request } from 'src/app/Models/request'
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { VEHCILE_KEY } from 'src/app/Models/cacheKeys';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class RequestComponent implements OnDestroy {

  requests: Request[] = []; // list of requests
  vehicle: Vehicle = new Vehicle; // vehicle selected by the user
 // fetchRequests: NodeJS.Timeout; // timer for refreshing the request list
  timer: any;

  /**
   * Constructor
   * @param requestService - request service to make http calls regarding requests
   * @param activatedRoute  - provides the vehicle passed from the router
   * @param alertController  - alert controller to present alert dialog
   * @param storageService  - storage service to retrieve or add vehicle to local storage
   * @param router  - router to navigate through pages
   */
  constructor(public requestService: RequestService, public activatedRoute: ActivatedRoute, public alertController: AlertController,
    public storageService: StorageService, public router: Router) {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe((result: Vehicle) => {

      if (result.id) { // vehicle was stored in the router
        this.vehicle = result;
        this.storageService.setKey(VEHCILE_KEY, result);
      } else { // grab vehicle from the local storage
        this.storageService.getValue(VEHCILE_KEY).then((result: Vehicle) => {
          this.vehicle = result;
        })
      }

      this.getRequests(); // get the list of requests
      this.timer = setInterval(this.getRequests.bind(this), 10 * 1000); // set timer interval for refreshing the request list
    });
  }

  /**
   *  Clears the timer, once the component is destroyed
   */
  ngOnDestroy() {
    debugger;
    clearInterval(this.timer);
    //this.subscription.unsubscribe();
  }
  /**
   *  Gets the list of available requests
   */
  getRequests() {
    this.requestService.getRequest().subscribe((response: Request[]) => {

      if (response.length != 0) { // found available requests
        this.requests = response;
      } else { // no requests were found
        this.requests = [];
      }
    });
  }
  /**
   * Presents alert message to confirm the correct request was selected
   * @param req - selected request
   */
  async onSelect(req: Request) {
    console.log("clicked");

    let alert = this.alertController.create({ // creates alert dialog

      message: 'Do you want to accept this request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            clearInterval(this.timer); // clears the timer on the list
            this.router.navigateByUrl('drive', { state: req }); // navigates to drive component
             
          }
        }
      ]
    });
    (await alert).present(); // presents the alert on the screen 

  }
}
