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

    constructor(private fs: FileService) {
      fs.getFolderFiles(1).subscribe(res => this.files = res.json());
    }

}