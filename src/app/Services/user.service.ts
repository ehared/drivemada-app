import { Injectable } from '@angular/core';

import { User } from 'src/app/Models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';



@Injectable()
export class UserService {

    //url: string = 'https://drivemada-mobile.herokuapp.com';
    url: string = "https://ambitiously-aurochs-microfarad.herokuapp.com"
    auth:string;
    isLoggedIn: boolean = false;

    constructor(private http: HttpClient, private storage: Storage) { }
    
    setAuthToken(token: string) {
        this.auth = token;
    }

    getAuthHeaders() {
        return {headers: new HttpHeaders().set('Authorization', 'Bearer' + this.auth)};
    }
    login(user: FormData) {

        return this.http.post(this.url + '/auth', user);
    }
    
    loggedIn(token: string){
        
        this.setAuthToken(token); // save token
        this.isLoggedIn = true;
    }

    logout(){
        this.setAuthToken(null);
      /*  this.settings.load().then(()=>{
            this.settings.setValue('user', null);
        });*/
    }
    create(formData : FormData) {
        return this.http.post(this.url + '/users', formData);
    }

    get(user: User) {
        return this.http.get<User>(this.url + '/users/' + user.id)

    }

  //  updateUser(user: FormData) {
  //      return this.http.put(this.url + '/users/' + user.id, user);
  //  }

    updateCredentials() {

    }

    updateCard() {

    }

    delete(user: User) {
        return this.http.delete(this.url + '/users/' + user.id);
    }
}