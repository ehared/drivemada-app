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

    getRequest(): Observable<Request[]> {
        return this.http.get<Request[]>(this.url + '/GetRequest');
    }

    getTrips(id: number): Observable<Request[]>{
        return this.http.get<Request[]>(this.url + '/GetDriverRequests?id=' +  id);
    }

    update(request: Request) {
        return this.http.put(this.url + '/UpdateRequestById', request);
    }

    delete(id: number) {
        return this.http.delete(this.url + '/DeleteRequestById?id=' + id);
    }
}