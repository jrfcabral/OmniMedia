import { Component } from '@angular/core';

import { FileService } from '../services/file.service';

import { File } from '../interfaces/File';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {

    files: Observable<File[]>;
    expand: boolean = false;

    constructor(private fs: FileService) {
      fs.getFolderFiles(2).subscribe(res => {this.files = res.json()});
    }

    private toggleExpand(){
      this.expand = !this.expand;
    }

}