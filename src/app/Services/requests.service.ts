/**
 * Filename: requests.service.ts
 * Purpose: Performs HTTP calls to request controller of the drivemada backend
 * Author: Eltire Hared
 */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Request} from 'src/app/Models/request'


@Injectable()
export class RequestService {

    url = "https://localhost:44397/api/request";

    constructor(private http: HttpClient) { }

    /**
     *  Gets all available requests
     */
    getRequest(): Observable<Request[]> {
        return this.http.get<Request[]>(this.url + '/GetRequest');
    }
    /**
     * Retrieves list of trips completed
     */
    getTrips(id: number): Observable<Request[]>{
        return this.http.get<Request[]>(this.url + '/GetDriverRequests?id=' +  id);
    }
    /**
     * Updates a request as completed
     * @param request request to be completed
     */
    update(request: Request) {
        return this.http.put(this.url + '/UpdateRequestById', request);
    }
    /**
     * Deletes a request
     * @param id - id of the request to be deleted
     */
    delete(id: number) {
        return this.http.delete(this.url + '/DeleteRequestById?id=' + id);
    }
}