import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
@Injectable()
export class SettingsService {
    private authServer: string;
    private authServerSubject: BehaviorSubject<string>;

    constructor() {
        this.authServerSubject = new BehaviorSubject('http://localhost:8080');
    }

    public setAuthServer(newAuthServer: string): void {
        this.authServer = newAuthServer;
        this.authServerSubject.next(this.authServer);
    }

    public getAuthServer(): Observable<string> {
        return this.authServerSubject.asObservable();
    }
}
