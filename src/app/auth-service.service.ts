import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceService {

    // Change to this http://ed43bb3b.ngrok.io/api/login
    static readonly LOGIN_URL = 'http://ed43bb3b.ngrok.io/api/login';
    // Change to this http://ed43bb3b.ngrok.io/api/register
    static readonly REGISTER_URL = 'http://ed43bb3b.ngrok.io/api/register';
    access: boolean;
    token: string;

    constructor(public http: HttpClient) {
    }

    // Login
    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw('Please insert credentials.');
        } else {
            return Observable.create(observer => {

                this.http.post(AuthServiceService.LOGIN_URL, credentials)
                    .subscribe((data: any) => {
                        if (data.access_token) {
                            this.token = 'Bearer ' + data.access_token;
                            this.access = true;
                        } else {
                            this.access = false;
                        }
                    });

                setTimeout(() => {
                    observer.next(this.access);
                }, 500);

                setTimeout(() => {
                    observer.complete();
                }, 1000);


            }, err => console.error(err));
        }
    }

    // Register
    public register(credentials) {
        if (credentials.name === null || credentials.email === null || credentials.password === null) {
            return Observable.throw('Please insert credentials');
        } else {
            return Observable.create(observer => {

                this.http.post(AuthServiceService.REGISTER_URL, credentials)
                    .subscribe((data: any) => {
                        console.log(data);
                    });

                observer.next(true);
                observer.complete();
            });
        }
    }

    // Get Token
    public getToken() {
        return this.token;
    }

    // Logout
    public logout() {
        return Observable.create(observer => {
            observer.next(true);
            observer.complete();
        });
    }

}
