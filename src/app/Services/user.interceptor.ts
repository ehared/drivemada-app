import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { UserService } from 'src/app/Services/user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    constructor(public userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        const token = this.userService.getToken();

        if (token) {
            const headersConfig = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            req = req.clone({ setHeaders: headersConfig });
            return next.handle(req);
        } else
            return next.handle(req);
    }
}