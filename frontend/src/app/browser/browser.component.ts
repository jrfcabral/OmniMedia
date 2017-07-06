import { AlbumCoverService } from './../services/album-cover.service';
import { BaseService } from './../services/base.service';
import { File } from './../interfaces/File';
import { Component } from '@angular/core';

import { FileService } from '../services/file.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css'],
  providers: [AlbumCoverService,]
})
export class BrowserComponent {

    files: File[] = [];
    flatFiles: File[] = [];
    selectedFile: File = {id: 1, name: '', is_dir: false};
    sortOption = 'folders';
    image: string;
    loaded = false;

    constructor(private fs: FileService, private albumCover: AlbumCoverService) {
      fs.getFolderFiles(false).subscribe(res => {
        res.forEach(element => {
          element.json().forEach(subelement => this.files.push(subelement));
        });
        this.loaded = true;
      });
      fs.getFolderFiles(true).subscribe(res => {
        res.forEach(element => {
          element.json().forEach(subelement => this.flatFiles.push(subelement));
        });
      });    }

    private fileSelected(theFile: File) {
      this.selectedFile = theFile;
    }

    private toggleOption(opt){
      this.sortOption = opt;
    }

}
