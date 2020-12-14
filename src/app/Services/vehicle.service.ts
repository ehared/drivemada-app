import { Injectable } from '@angular/core';

import { User } from 'src/app/Models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Vehicle } from '../Models/vehicle';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable } from 'rxjs';



@Injectable()
export class VehicleService {

    url: string = "https://localhost:44397/api/vehicle"
   

    constructor(private http: HttpClient) { }
    
   create(id : number, vehicle: Vehicle) {
        return this.http.post(this.url + '/AddVehicleByUserId?id=' + id, vehicle);
    }

    get(id: number) {
        return this.http.get<Vehicle[]>(this.url + '/GetVehicleByUserId?id=' + id);

    }
    update(vehicle: Vehicle) {
        return this.http.put(this.url + '/UpdateVehicleByUserId', vehicle);
    }

    delete(id: number) {
        return this.http.delete(this.url + '/DeleteVehicleById?id=' + id);
    }
}