import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    templateUrl: './fileEntryList.component.html',
    selector: 'file-list-entry'
})
export class FileListEntry {
    @Input('key') key: string;
    @Input('files') files: File[];
    @Output() selectFileEvent: EventEmitter<File> = new EventEmitter(true);

    private expanded = false;

    private fileSelected(theFile){
        console.log("got it in file component!");
        console.log(theFile);
        this.selectFileEvent.emit(theFile);
    }

    private toggleExpand(): void {
        this.expanded = !this.expanded;
    }
}
