import { Component } from '@angular/core';

import { FileService } from '../services/file.service';

import { File } from '../interfaces/File';

@Component({
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {

    files: File[];

    constructor(private fs: FileService) {
      this.fs.getFiles().subscribe(success => {
        this.files = this.fs.files;
        console.log(this.fs.files);
      })
      this.fs.getFilesFromServer();
    }

}