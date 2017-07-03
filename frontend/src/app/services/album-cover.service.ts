import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class AlbumCoverService {

    constructor(private http: Http) {

    }

    public getAlbumCover(title: string, artist?: string): Observable<string> {
        let requestUrl = 'https://musicbrainz.org/ws/2/release/?query=release:' + title;
        if (artist) {
            requestUrl = requestUrl.concat(' AND artist:' + artist);
        }
        const header = new Headers({'Accept': 'application/json'});
        console.log(requestUrl);
        const options = new RequestOptions({headers: header});
        return this.http.get(requestUrl, options).mergeMap(response => {
            const data = response.json();
            console.log(data.count);
            if (data.count >= 1) {
                return Observable.of(data.releases[0].id);
            } else {
                return Observable.throw(new Error('Album not found'));
            }
        }).mergeMap(mbid => {
            return this.http.get('https://coverartarchive.org/release/'.concat(mbid));
        }).mergeMap(response => {
            const data = response.json();
            if (data.images.length > 0) {
                return Observable.of(data.images[0].image);
            } else {
                return Observable.throw(new Error('No album image found'));
            }
        });
    }
}
