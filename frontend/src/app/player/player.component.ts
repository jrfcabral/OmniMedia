import { Component, Input } from '@angular/core';

import { File } from '../interfaces/File';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: "player",
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent{
    @Input('selectedFile') private selectedFile: File;

    playing: boolean = false;;

    public constructor(){}

    private togglePlaying(){
        this.playing = !this.playing;
    }

}