import { Injectable } from '@angular/core';

import { User } from 'src/app/Models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Vehicle } from '../Models/vehicle';
import { identifierModuleUrl } from '@angular/compiler';



@Injectable()
export class VehicleService {

    url: string = "https://localhost:44397/api/vehicle"
  
    constructor(private http: HttpClient) { }
    
   create(vehicle: Vehicle) {
        return this.http.post(this.url, vehicle);
    }

    get(id: number) {
        return this.http.get<Vehicle>(this.url + '/GetVehicleByUserId?id=' + id);

    }
    update(vehicle: Vehicle) {
        return this.http.put(this.url + vehicle.id, vehicle);
    }

    delete(id: number) {
        return this.http.delete(this.url + '/DeleteVehicleByUserId?id=' + id);
    }
}