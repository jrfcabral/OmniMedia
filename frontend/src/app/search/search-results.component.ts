import { File } from './../interfaces/File';
import { Observable } from 'rxjs/Rx';
import { SearchService } from './../services/search.service';
import { Component } from '@angular/core';
import 'rxjs/add/operator/finally';

@Component({
    selector: 'search-results',
    templateUrl: 'search-results.template.html',
    styleUrls: ['search-results.style.css', ],
})
export class SearchResultComponent {

    private files: Observable<File[]>;
    private _loaded: boolean;

    constructor(public search: SearchService) {
        this.files = search.getFilteredFiles().map(files => files.filter(file => file.title));
        this.files.subscribe(_ => this._loaded = true);
    }

    public set loaded(loadValue: boolean) {
        this._loaded = false;
    }
}
