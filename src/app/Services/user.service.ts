import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';
import { CURRENT_USER_KEY, TOKEN_KEY, VEHCILE_KEY } from '../Models/cacheKeys';



@Injectable()
export class UserService {
    
    //url: string = 'https://drivemada-mobile.herokuapp.com';
    //url: string = "https://ambitiously-aurochs-microfarad.herokuapp.com";
    url: string = "http://localhost:3001";
    auth:string;
    isLoggedIn: boolean = false;

    constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }
    
    setAuthToken(token: string) {
        this.auth = token;
    }

    getAuthHeaders() {
        return {headers: new HttpHeaders().set("Authorization", "Bearer" + this.auth)};
    }
    login(user: FormData) {

        return this.http.post(this.url + '/auth', user);
    }
    //
    loggedIn(token: string){
        
        this.setAuthToken(token); // save token
        this.storageService.setKey(TOKEN_KEY, token);
        this.isLoggedIn = true;
    }

    logout(){
        this.setAuthToken(null);
        this.storageService.deleteKey(CURRENT_USER_KEY);
        this.storageService.deleteKey(VEHCILE_KEY);
        this.storageService.deleteKey(TOKEN_KEY);
        this.router.navigateByUrl('welcome', { replaceUrl: true });
    }
    create(user:any) {
        return this.http.post(this.url + '/users', JSON.parse(user));
    }

    get(user: User) {
        return this.http.get<User>(this.url + '/users/' + user.id)

    }
    
    getSelf(){
        return this.http.get(this.url + '/users/me');
    }

    getToken(){
        //debugger;
        if(this.auth != null)
            return this.auth;
        return this.storageService.getValue[TOKEN_KEY];
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