import { Component, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Vehicle } from 'src/app/Models/vehicle';
import { RequestService } from 'src/app/Services/requests.service';
import { Request } from 'src/app/Models/request'
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { VEHCILE_KEY } from 'src/app/Models/cacheKeys';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss', '../../../assets/scss/purpose-dark.scss'],
})
export class RequestComponent implements OnDestroy {

  requests: Request[] = [];
  vehicle: Vehicle = new Vehicle;
  fetchRequests: NodeJS.Timeout;
  constructor(public requestService: RequestService, public activatedRoute: ActivatedRoute, public alertController: AlertController,
    public storageService: StorageService, public router: Router) {
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe((result: Vehicle) => {

      if (result.id) {
        this.vehicle = result;
        this.storageService.setKey(VEHCILE_KEY, result);
      } else {
        this.storageService.getValue(VEHCILE_KEY).then((result: Vehicle) => {
          this.vehicle = result;
        })
      }

      this.getRequests();
      this.fetchRequests = setInterval(this.getRequests.bind(this), 10 * 1000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.fetchRequests)
  }

  getRequests() {
    this.requestService.getRequest().subscribe((response: Request[]) => {
      this.requests = response;
    });
  }

  async onSelect(req: Request) {
    console.log("clicked");

    let alert = this.alertController.create({

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
            this.router.navigateByUrl('drive', { state: req });
            clearInterval(this.fetchRequests)
          }
        }
      ]
    });
    (await alert).present();

  }
}
