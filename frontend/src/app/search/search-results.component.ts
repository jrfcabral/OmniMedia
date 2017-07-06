import { File } from './../interfaces/File';
import { Observable } from 'rxjs/Rx';
import { SearchService } from './../services/search.service';
import { Component } from '@angular/core';
@Component({
    selector: 'search-results',
    templateUrl: 'search-results.template.html',
})
export class SearchResultComponent {

    private files: Observable<File[]>;
    constructor(public search: SearchService) {
        this.files = search.getFilteredFiles().map(files => files.filter(file => file.title));
        this.files.subscribe(console.log);
    }
}
