import { File } from './../interfaces/File';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html'
})
export class FileComponent {
    @Input('file') private file: File;
    private expanded = false;

    constructor() {
    }

    private toggleExpand(): void {
        this.expanded = !this.expanded;
    }
}
