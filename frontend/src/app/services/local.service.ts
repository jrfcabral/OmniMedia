import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalService extends BaseService {

    constructor(public http: Http) {
        super(http);
    }

    

}
