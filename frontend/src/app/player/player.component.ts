import { AlbumCoverService } from './../services/album-cover.service';
import { Http } from '@angular/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { File } from '../interfaces/File';

import {VgAPI} from 'videogular2/core';


@Component({
    selector: 'player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css', ]
})
export class PlayerComponent implements OnChanges {
    @Input('selectedFile') private selectedFile: File;
    private img: string;
    private extension: string;
    audioExtensions = ['mp3'];
    videoExtensions = ['mp4'];
    playing = false;
    vgApi: VgAPI;

    public constructor(private http: Http, private albumCover: AlbumCoverService) {
    }

    private togglePlaying() {
        this.playing = !this.playing;
    }

    ngOnChanges(changes: SimpleChanges) {
        if ( this.selectedFile.name !== '' ) {
            const aux = this.selectedFile.filepath.split('.');
            this.extension = aux[aux.length - 1];
            console.log(this.extension);
        }
        this.albumCover.getAlbumCover(this.selectedFile.album, this.selectedFile.artist).subscribe(
            success => this.img = success,
            err => {
                if (this.checkAudioExtension(this.extension)) {
                    this.img = 'noCover.png';
                } else {
                    this.img = undefined;
                }
            }
        );
    }

    onPlayerReady(api: VgAPI) {
        this.vgApi = api;
        this.vgApi.getDefaultMedia().subscriptions.canPlayThrough.subscribe(ev => this.vgApi.play());
        this.vgApi.getDefaultMedia().subscriptions.ended.subscribe(ev => console.log('num da mais'));
    }

    private checkVideoExtension(ext) {
        if (ext && this.videoExtensions.indexOf(ext) !== -1) {
            return true;
        }
        return false;
    }

    private checkAudioExtension(ext) {
        if (ext && this.audioExtensions.indexOf(ext) !== -1) {
            return true;
        }
        return false;
    }

}
