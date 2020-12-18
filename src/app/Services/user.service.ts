/**
 * Filename: user.service.ts
 * Purpose: service to make HTTP requests related to a user. (Caremada backend)
 * Author: Eltire Hared
 */
import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';
import { CURRENT_USER_KEY, TOKEN_KEY, VEHCILE_KEY } from '../Models/cacheKeys';



@Injectable()
export class UserService {

    //url: string = "https://ambitiously-aurochs-microfarad.herokuapp.com"; // caremada backend
    url: string = "http://localhost:3001";
    auth: string; // user's token
    isLoggedIn: boolean = false; // boolean to check if the user is logged in

    /**
     * 
     * @param http - HTTP Client to be used for making http requests
     * @param storageService  - storage service to retrive, add, or remove items from storage
     * @param router  - router to navigate to pages
     */
    constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

    /**
     * Sets the token of the user
     * @param token - token to be saved
     */
    setAuthToken(token: string) {
        this.auth = token;
    }

    /**
     * Makes a call to verify the user's account credentials
     * @param user - FormData containing user credentials
     */
    login(user: FormData) {

        return this.http.post(this.url + '/auth', user);
    }

    /**
     * Sets user to be logged in, saves user related data to storage
     * @param token - token to be saved.
     */
    loggedIn(token: string) {

        this.setAuthToken(token); // save token
        this.storageService.setKey(TOKEN_KEY, token);
        this.isLoggedIn = true;
    }
    /**
     * Logs out the current user, removing saved user data from storage, and navigates to welcome page. 
     */
    logout() {
        this.setAuthToken(null);
        this.storageService.deleteKey(CURRENT_USER_KEY);
        this.storageService.deleteKey(VEHCILE_KEY);
        this.storageService.deleteKey(TOKEN_KEY);
        this.router.navigateByUrl('welcome', { replaceUrl: true });
    }
    /**
     * Creates a user in the caremada database
     * @param user - user to be added
     */
    create(user: any) {
        return this.http.post(this.url + '/users', JSON.parse(user));
    }
    /**
     * Retrieves the user from caremada backened
     * @param user 
     */
    get(user: User) {
        return this.http.get(this.url + '/users/' + user.id)

    }
    /**
     * Retrieve current user's profile information from caremada backend
     */
    getSelf() {
        return this.http.get(this.url + '/users/me');
    }
    /**
     * returns the current user's token to be added to auth header
     */
    getToken() {
        if (this.auth != null)
            return this.auth;
        return this.storageService.getValue[TOKEN_KEY];
    }
}