import { AlbumCoverService } from './../services/album-cover.service';
import { Http } from '@angular/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { File } from '../interfaces/File';

import {VgAPI} from 'videogular2/core';


@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss',]
})
export class PlayerComponent implements OnChanges{
    @Input('selectedFile') private selectedFile: File;
    private img: string;

    playing = false;
    vgApi: VgAPI;

    public constructor(private http: Http, private albumCover: AlbumCoverService) {
    }

    private togglePlaying() {
        this.playing = !this.playing;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.albumCover.getAlbumCover(this.selectedFile.album, this.selectedFile.artist).subscribe(
            success => this.img = success,
            err => this.img = undefined
        );
    }

    onPlayerReady(api:VgAPI) {
        this.vgApi = api;
        this.vgApi.getDefaultMedia().subscriptions.canPlayThrough.subscribe(ev => this.vgApi.play());
        this.vgApi.getDefaultMedia().subscriptions.ended.subscribe(ev => console.log('num da mais'));
    }

}