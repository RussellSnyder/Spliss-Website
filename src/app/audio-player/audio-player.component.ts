import {Component, OnInit, AfterViewInit} from '@angular/core';
declare var SC: any;
import './soundcloudApi.js';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements AfterViewInit {
    widget;
    playlistLength = 16;

    constructor() {
    }

    ngAfterViewInit() {
        var iframeElement = document.querySelector('#app-audio-player');
        this.widget = SC.Widget(iframeElement);
        this.widget.bind(SC.Widget.Events.READY, () => {
            this.loadTrack(Math.floor(Math.random() * this.playlistLength));
        });

    }

    ngOnInit() {

    }

    play() {
        this.widget.play();
    }

    playOnLoad() {
        this.widget.bind(SC.Widget.Events.READY, () => {
            this.play();
            this.widget.unbind(SC.Widget.Events.READY);
        });
    }

    loadTrack(index) {
        this.widget.load(
            "https://api.soundcloud.com/playlists/348524406",
            {
                auto_play: false,
                show_artwork: false,
                liking: false,
                sharing: true,
                show_playcount: true,
                start_track: index
            }
        );
    }
}

