
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import * as _ from 'underscore';

@Component({
  selector: 'filelist',
  templateUrl: './fileList.component.html',
  styleUrls: ['./fileList.component.css']
})
export class FileListComponent implements OnInit {

    @Input('files') files: File[];
    @Input('sort') sort: string;
    @Output() selectFileEvent: EventEmitter<File> = new EventEmitter(true);


    private sortedFiles: File[];
    private keys: string[];

    public constructor(){
        console.log('criado')
    }

    private filesByProperty( prop: string): any {
      return _.groupBy(this.files, prop);
    }

    ngOnInit() {
        if (this.sort === 'artists') {
            this.sortedFiles = this.filesByProperty('artist');
        } else if (this.sort === 'albums') {
            this.sortedFiles = this.filesByProperty('album');
        }
    }

    ngOnChanges() {
        if (this.sort === 'artists') {
            this.sortedFiles = this.filesByProperty('artist');
        } else if (this.sort === 'albums') {
            this.sortedFiles = this.filesByProperty('album');
        }
        this.keys = Object.keys(this.sortedFiles);

    }

    private fileSelected(theFile){
        console.log("got it in file component!");
        console.log(theFile);
        this.selectFileEvent.emit(theFile);
    }

}
