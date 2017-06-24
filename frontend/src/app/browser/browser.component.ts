import { Component } from '@angular/core';

import { File } from '../interfaces/File';

@Component({
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {

    files: File[];

    constructor() {}

}