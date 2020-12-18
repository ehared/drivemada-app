/**
 * Filename: vehicle.service.ts
 * Purpose: Performs api calls to drivemada backened. (Vehicle controller)
 * Author: Eltire Hared
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../Models/vehicle';



@Injectable()
export class VehicleService {

    url: string = "https://localhost:44397/api/vehicle"


    /**
     * Constructor
     * @param http - HTTP client to perform http requests
     */
    constructor(private http: HttpClient) { }

    /**
     * Creates a vehicle
     * @param id  - vehicle's id
     * @param vehicle  - vehicle
     */
    create(id: number, vehicle: Vehicle) {
        return this.http.post(this.url + '/AddVehicleByUserId?id=' + id, vehicle);
    }
    /**
     * Retrieves list of vehicles with the matching user id.
     * @param id - user id
     */
    get(id: number) {
        return this.http.get<Vehicle[]>(this.url + '/GetVehicleByUserId?id=' + id);

    }
    /**
     * Updates vehicle in database
     * @param vehicle - updated vehicle
     */
    update(vehicle: Vehicle) {
        return this.http.put(this.url + '/UpdateVehicleByUserId', vehicle);
    }
    /**
     * Deletes a vehicle
     * @param id - id of the vehicle to delete
     */
    delete(id: number) {
        return this.http.delete(this.url + '/DeleteVehicleById?id=' + id);
    }
}