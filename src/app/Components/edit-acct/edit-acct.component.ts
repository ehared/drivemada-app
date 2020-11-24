import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClientXsrfModule, HttpClient } from  '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-edit-acct',
  templateUrl: './edit-acct.component.html',
  styleUrls: ['./edit-acct.component.scss'],
})
export class EditAcctComponent implements OnInit {

  constructor(private _location: Location, private http: HttpClient) { }
  email: string;
  password : string;
  phoneNumber: string;

  ngOnInit() {
    let data1 = this.getUsers()
    .subscribe((data:any) => {
      // console.log(data);
      this.email = data.email;
      this.password = data.password;
      this.phoneNumber = data.phoneNumber;
      // this.users = data.data;
    });
  }

  getUsers() {
    return this.http.get('http://localhost:8000/editAcct')
        .pipe(
           map((data: any) => {
             return data;
           })
        )
  }
  saveUsers() {
    return this.http.get('http://localhost:8000/showAcct'+'/'+this.email+'/'+this.password+'/'+this.phoneNumber)
        .pipe(
           map((data: any) => {
             return data;
           })
        )
  }

  back() {
    this._location.back();
  }

  editAccount() {
    let data1 = this.saveUsers()
    .subscribe((data:any) => {
      // console.log(data);
    
      // this.users = data.data;
    });
    this._location.back();
  }
}
