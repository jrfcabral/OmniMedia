import { IHttpParam } from './base.service';
import { Observable } from 'rxjs';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

    constructor(public http: Http) {}

    public get(endpoint: string, path: string, params?: IHttpParam[]): Observable<Response> {
        return this.http.get(`${endpoint}/${path}`, this.getOptions(params));
    }

    private getOptions(params: IHttpParam[]): RequestOptions {
        const search = new URLSearchParams();
        const headers = this.getHeaders();
        if(params) {
            params.map(elem => search.set(elem.key, elem.value));
        }
        console.log(search)
        return new RequestOptions({headers, search});
    }

    protected getHeaders(): Headers {
        return new Headers();
    }
}

export interface IHttpParam {
    key: string;
    value: string;
}

export function param(key: string, value: string): IHttpParam {
    return {key: key, value: value};
}
