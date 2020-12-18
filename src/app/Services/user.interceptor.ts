/**
 * Filename: user.interceptor.ts
 * Purpose: HTTP Interceptor for user service
 * Author: Eltire Hared
 */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserService } from 'src/app/Services/user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    /**
     *  Contructor
     * @param userService - user service
     */
    constructor(public userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.userService.getToken(); // retrieve user's token
        if (token) { // token found, add bearer token to the auth header of the request
            const headersConfig = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            req = req.clone({ setHeaders: headersConfig });
            return next.handle(req);
        } else // no token was found
            return next.handle(req);
    }
}