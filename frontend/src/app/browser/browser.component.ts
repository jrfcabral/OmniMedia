import { Component } from '@angular/core';

import { FileService } from '../services/file.service';

import { File } from '../interfaces/File';

import { Observable } from 'Rxjs/Observable';

@Component({
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {

    files: Observable<File[]>;

    constructor(private fs: FileService) {
      this.files = fs.getFolderFiles(1);
    }

}