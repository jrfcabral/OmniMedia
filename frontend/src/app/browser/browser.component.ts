import { File } from './../interfaces/File';
import { Component } from '@angular/core';

import { FileService } from '../services/file.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {

    files: File[];
    selectedFile: File = {"name": "lol", "is_dir": false};

    constructor(private fs: FileService) {
      fs.getFolderFiles(1).subscribe(res => this.files = res.json());
    }

    private fileSelected(theFile){
      console.log("got it in browser component!");
      console.log(theFile);
      this.selectedFile = theFile;
    }



}