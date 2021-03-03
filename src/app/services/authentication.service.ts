import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {

    constructor(private httpClient: HttpClient) {
    }

    authenticateUser(user) {
        return this.httpClient.post('http://localhost:3000/auth/v1', user); // username / password / token
    }
    setBearerToken(token: string) {
        localStorage.setItem('appToken', token);
    }

    getBearerToken(): string {
        return localStorage.getItem('appToken');
    }

    isUserAuthenticated(token: string) {
        // Send token in header for authorization
        return this.httpClient.post('http://localhost:3000/auth/v1/isAuthenticated', {},
            { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
            .pipe(map(response => response['isAuthenticated'])).toPromise();
    }
}


