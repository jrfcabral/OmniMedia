import { Observable } from 'rxjs/Observable';
import { SearchService } from './../services/search.service';
import { Component, OnInit } from '@angular/core';
import {File } from './../interfaces/File';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';


@Component({
    selector: 'search-filters',
    templateUrl: 'search-filters.template.html',
})
export class SearchFilterComponent implements OnInit {

    private searchForm: FormGroup;

    constructor(public search: SearchService, public fb: FormBuilder) {
        this.createForm();
        this.searchForm.valueChanges.debounceTime(1000).subscribe(_ => {
            const textFilter = (file: File) => file.title === this.searchForm.get('search').value
                || this.searchForm.get('search').value === '';
            const albumFilter = (file: File) => file.album === this.searchForm.get('album').value
                || this.searchForm.get('album').value === '';;
            const artistFilter = (file: File) => file.artist === this.searchForm.get('artist').value
                || this.searchForm.get('artist').value === '';;
            const dateFilter = (file: File) => parseInt(file.date) >= parseInt(this.searchForm.get('startYear').value)
                && parseInt(file.date) <= parseInt(this.searchForm.get('endYear').value)
                || this.searchForm.get('endYear').value === '' || this.searchForm.get('startYear').value === '' ;            ;
            search.filters = [textFilter, albumFilter, artistFilter, dateFilter];
        });
    }

    private createForm(): void {
        this.searchForm = this.fb.group({
            search: '',
            album: '',
            artist: '',
            startYear: '',
            endYear: '',
        });
    }

    public get searchFormChanges(): Observable<any> {
        return this.searchForm.valueChanges;
    }

    public ngOnInit(): void {

    }
}