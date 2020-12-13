import { from, Observable } from 'rxjs';
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

    getTrips(){
        return this.http.get<Request[]>(this.url + '/GetDriverRequests');
    }

    update(request: Request) {
        return this.http.put(this.url + '/UpdateRequestById', request);
    }

    delete(id: number) {
        return this.http.delete(this.url + '/DeleteRequestById?id=' + id);
    }
}