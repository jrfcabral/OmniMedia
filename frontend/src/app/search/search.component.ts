import { SearchService } from './../services/search.service';
import { Component } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    providers: [SearchService, ],
})
export class SearchComponent {

    constructor(private searchService: SearchService) {}
    

}
