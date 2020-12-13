import { Component, OnInit } from '@angular/core';
import { RequestService } from 'android/app/src/main/assets/public/app/Services/requests.service';
import { CURRENT_USER_KEY } from 'src/app/Models/cacheKeys';
import { User } from 'src/app/Models/user';
import { StorageService } from 'src/app/Services/storage.service';
import { Request } from 'src/app/Models/request'
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {

  toggle: boolean = false;
  user: User = new User;
  requests: Request[] = [];
  constructor(public storageService: StorageService, public requestService: RequestService, public menuController: MenuController) {


    this.storageService.getValue(CURRENT_USER_KEY).then((result: User) => {
      if (result) {
        this.user = result;
        this.getRequests();
      }
    })
  }

  ngOnInit() { }

  getRequests() {
    this.requestService.getTrips(this.user.id).subscribe((response: Request[]) => {
      this.requests = response;
    });
  }



}
