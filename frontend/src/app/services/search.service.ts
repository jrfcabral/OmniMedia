import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FileService } from './file.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';

import { Injectable } from '@angular/core';

import * as _ from 'underscore';

import { File } from './../interfaces/File';

@Injectable()
export class SearchService {

    private fileList: Observable<File[]>;
    private filterFunction: BehaviorSubject<(file: File) => boolean> =  new BehaviorSubject((_: File) => true);

    constructor(public fileService: FileService) {
        this.fileList = fileService.getFolderFiles(true).map(responses => {
            const jsonResponses = responses.map(response => response.json());
            return _.flatten(jsonResponses);
        });
    }

    set filters(filters: ((file: File) => boolean)[]) {
        this.filterFunction.next( (file: File) => !filters.map(func => func(file)).some(val => val === false));
    }

    public getFilteredFiles(): Observable<File[]> {
        return this.fileList.combineLatest(this.filterFunction, (files, filterFunction) => files.filter(filterFunction));
    }

}
