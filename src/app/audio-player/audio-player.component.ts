import {Component, OnInit, AfterViewInit} from '@angular/core';
declare var SC: any;
import './soundcloudApi.js';
import {WpService} from "../wp.service";
import {DomSanitizer} from "@angular/platform-browser";
import {setDOM} from "@angular/platform-browser/src/dom/dom_adapter";

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements AfterViewInit {
    widget;
    playlistLength = 16;
    data;

    constructor(private wpService: WpService, private sanitizer: DomSanitizer) {
    }

    ngAfterViewInit() {
        var iframeElement = document.querySelector('#app-audio-player');
        this.widget = SC.Widget(iframeElement);
        this.widget.bind(SC.Widget.Events.READY, () => {
            this.loadTrack(Math.floor(Math.random() * this.playlistLength));
        });
    }

    createEmbedLink(playlist) {
        return (`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlist}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false`).toString();
    }

    ngOnInit() {
        var data = this.wpService.getSiteData();

        if (typeof data.then == 'function') {
            this.wpService.getSiteData().then(data => {
                this.data = data;
            })
        } else {
            this.data = data;
        }

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

