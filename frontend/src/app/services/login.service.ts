import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class LoginService {

    public token: String;
    private loggedin: boolean;
    private loggedin$: BehaviorSubject<boolean>;

    public constructor(private http: Http) {
        this.loggedin = false;
        this.token = '';
        this.loggedin$ = new BehaviorSubject<boolean>(this.loggedin);
    }

    public getAuthStatus(): Observable<boolean> {
        return this.loggedin$.asObservable();
    }

    public getToken(email, pass): void {
        this.http.post('http://localhost:8080/authentication', JSON.stringify({email: email, password: pass})).subscribe( resp => {
                this.token = resp.json().token;
                this.loggedin = true;
                this.loggedin$.next(this.loggedin);
        }, error => this.loggedin$.next(false));
    }
}
