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
    selectedFile: File = {name: "lol", is_dir: false};

    constructor(private fs: FileService, private bs: BaseService) {
      fs.getFolderFiles().subscribe(res => {
        res.forEach(element => {
          element.json().forEach(subelement => this.files.push(subelement));
        });
      });
    }

    private fileSelected(theFile){
      console.log("got it in browser component!");
      console.log(theFile);
      this.selectedFile = theFile;
      this.bs.get("http://localhost", "file/1", [{key: "search", value: "lol"}]).subscribe(console.log);

    }



}