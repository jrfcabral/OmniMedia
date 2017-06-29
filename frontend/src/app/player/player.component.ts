import { Http } from '@angular/http';
import { Component, Input } from '@angular/core';

import { File } from '../interfaces/File';

import 'rxjs/add/Operator/map';
import {VgAPI} from 'videogular2/core';


@Component({
    selector: "player",
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent{
    @Input('selectedFile') private selectedFile: File;
    private vgApi : VgAPI;

    playing: boolean = false;;

    public constructor(private http: Http){
        http.get('ola').map
    }

    private togglePlaying(){
        this.playing = !this.playing;
    }

    private onPlayerReady(api: VgAPI) {
        api.getDefaultMedia().subscriptions.progress.subscribe(next => console.log(next));
        
    }

}