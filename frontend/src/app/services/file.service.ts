import { Observable } from 'rxjs/Observable';
import { SettingsService } from './settings.service';
//import { IFile } from './../models/file.model';
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/forkJoin';


import { File } from '../interfaces/File';


@Injectable()
export class FileService {

    files: File[];
    private headers = new Headers({ 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE0OTgzNDk4NjIsImV4cCI6MTQ5ODM1MDIyMiwiZW1haWwiOiJqYWNrdGhlbW90b3JjeWNsZUBnbWFpbC5jb20ifQ.VIN3flZVX3jEB8lF5NzGV3bDC0Fnko0DGGNk4jGlf1n9pFsYH73gfUesDxDfm6T4ZVysmZP0lVrOFs3_5QcaL_V3qxSiJFvqKcNT-QCY1KzdyNXSClXfUB8g0GhGAjrXgNFzokOE6gCBKQIwbsHL9I-O8LlCDyY-y-P3HYfzijCSc0YCKfvp1fQDYfhPgrFNUSUnJwVw7t_U5DjTaYvQCVkomCdCTuCk5Cs3qLXckVjKHZtUOO3vDksIefaOooVARhJd8urqFIN0bScuzNDxb3VT5JyUB4K9fi6kRtNC5v9y2Vi-aqlzSwDzJpOHbJOcFCe99WsYtEGbhy_9_gMXRA' });
    private options = new RequestOptions({ headers: this.headers });


    public constructor(private http: Http, private settingService: SettingsService) {

    }

    public getFolderFiles(flat: boolean = true): Observable<any> {
        console.log("called "+ flat);
        return this.settingService.getAuthServer().mergeMap(authServer =>
            this.http.get(authServer + '/local_server', this.options)
        ).mergeMap(localServers => {
            const observables: Observable<any>[] = localServers.json().map(ip => this.http.get('http://' + ip + '/folders', this.options));
            return Observable.forkJoin(observables);
        }).mergeMap(folderResponses => {
            const observables = folderResponses.map(folderResponse => {
                const url = folderResponse.url.split('/').slice(0, 3).join('/') + '/file/';
                const folders = folderResponse.json();

                return folders.map(folder => this.http.get(url + folder.id + '?flat=' + flat, this.options))
            });
            return Observable.forkJoin([].concat.apply([], observables));
        });
        //return this.http.get('http://localhost:8000/file/' + folder, options);
    }
}
