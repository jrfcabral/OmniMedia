import { BaseService } from './../services/base.service';
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

    files: File[] = [];
    flatFiles: File[] = [];
    selectedFile: File = {id: 1, name: '', is_dir: false};
    sortOption = 'folders';

    constructor(private fs: FileService) {
      fs.getFolderFiles(false).subscribe(res => {
        res.forEach(element => {
          element.json().forEach(subelement => this.files.push(subelement));
        });
      });
      fs.getFolderFiles(true).subscribe(res => {
        res.forEach(element => {
          element.json().forEach(subelement => this.flatFiles.push(subelement));
        });
      });    }

    private fileSelected(theFile) {
      this.selectedFile = theFile;
    }

    private toggleOption(opt){
      this.sortOption = opt;
    }

}
