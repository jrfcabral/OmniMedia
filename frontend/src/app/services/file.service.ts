import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { File } from '../interfaces/File';


@Injectable()
export class FileService {

    files: File[];
    files$: BehaviorSubject<boolean>
    done: boolean = false;

    public constructor(private http: Http, ){
        this.files$ = new BehaviorSubject<boolean>(this.done);
    }

  
    public getFolderFiles(folder: number): Observable<any> {
        let headers = new Headers({ 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE0OTgzNDk4NjIsImV4cCI6MTQ5ODM1MDIyMiwiZW1haWwiOiJqYWNrdGhlbW90b3JjeWNsZUBnbWFpbC5jb20ifQ.VIN3flZVX3jEB8lF5NzGV3bDC0Fnko0DGGNk4jGlf1n9pFsYH73gfUesDxDfm6T4ZVysmZP0lVrOFs3_5QcaL_V3qxSiJFvqKcNT-QCY1KzdyNXSClXfUB8g0GhGAjrXgNFzokOE6gCBKQIwbsHL9I-O8LlCDyY-y-P3HYfzijCSc0YCKfvp1fQDYfhPgrFNUSUnJwVw7t_U5DjTaYvQCVkomCdCTuCk5Cs3qLXckVjKHZtUOO3vDksIefaOooVARhJd8urqFIN0bScuzNDxb3VT5JyUB4K9fi6kRtNC5v9y2Vi-aqlzSwDzJpOHbJOcFCe99WsYtEGbhy_9_gMXRA' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8000/file/' + folder, options);
    }
}
