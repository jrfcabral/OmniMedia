import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { File } from '../interfaces/File';


@Injectable()
export class FileService {

    public constructor(private http: Http, ){}

    files: File[];

    public getFiles(){
        this.http.post('http://localhost:8080/authentication', JSON.stringify()).subscribe( resp => {
                
        }, error => );
    }
}
