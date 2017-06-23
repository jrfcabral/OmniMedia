import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable'; 


@Injectable()
export class LoginService{

    public constructor(http: Http){}

    public getToken(email, pass){
        console.log("ola");
    }
}