import {Component, OnInit, AfterViewInit} from '@angular/core';
declare var SC: any;
import './soundcloudApi.js';
import {WpService} from "../wp.service";

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements AfterViewInit {
    widget;
    playlistLength = 16;
    data;

    constructor(private wpService: WpService) {}

    ngAfterViewInit() {
        this.wpService.getSiteData().then(data => {
            console.log(data)
            this.data = data;
        })
            // var iframeElement = document.querySelector('#app-audio-player');
            // this.widget = SC.Widget(iframeElement);
            // this.widget.bind(SC.Widget.Events.READY, () => {
            //     this.loadTrack(Math.floor(Math.random() * this.playlistLength));
            // });
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
            "https://api.soundcloud.com/playlists/" + this.data.featuredMusic.playlist,
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

