import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { User } from 'src/app/Models/user'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    url: string = 'https://drivemada-mobile.herokuapp.com';

    constructor(private http: HttpClient) { }

    login(user: FormData) {
        return this.http.post(this.url + '/auth', user);
    }
    create(formData : FormData) {
        return this.http.post(this.url + '/users', formData);
    }

    get(user: User) {
        return this.http.get<User>(this.url + '/users/' + user.id)

    }

    jsonToFormData(json: any) {
        const formData = new FormData();
        for (const key in json) {
            formData.append(key, json[key]);
        }
        return formData;
    }

    updateUser(user: User) {
        return this.http.put(this.url + '/users/' + user.id, user);
    }

    updateCredentials(user: User) {

    }

    updateCard(user: User) {

    }

    delete(user: User) {
        return this.http.delete(this.url + '/users/' + user.id);
    }
}