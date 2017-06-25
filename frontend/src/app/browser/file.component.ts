import { File } from './../interfaces/File';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html'
})
export class FileComponent {
    @Input('file') private file: File;
    private expanded = false;
    @Output() selectFileEvent: EventEmitter<File> = new EventEmitter(true);

    constructor() {
    }

    private toggleExpand(): void {
        this.expanded = !this.expanded;
    }

    private selectFile(){
        console.log("emitting");
        this.selectFileEvent.emit(this.file);
    }

    private fileSelected(theFile){
        console.log("got it in file component!");
        console.log(theFile);
        this.selectFileEvent.emit(theFile);
    }
}
