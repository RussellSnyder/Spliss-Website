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
    currentIndex = 0;
    tracks = {
        thisLittleFinger: 339816007,
        beyondTheWall: 339816006
    }
    trackIds;

    constructor() {
        this.trackIds = Object.keys(this.tracks).map((trackname) => this.tracks[trackname]);
    }

    ngAfterViewInit() {
        var iframeElement = document.querySelector('#app-audio-player');
        this.widget = SC.Widget(iframeElement);
        this.widget.bind(SC.Widget.Events.READY, () => {
            this.loadTrack(0);
        });
        this.widget.bind(SC.Widget.Events.FINISH, () => {
            this.onTrackFinished()
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
    loadTrack(index = 0) {
        this.widget.load(
            "https://api.soundcloud.com/tracks/" + this.trackIds[index],
            {
                auto_play: false,
                show_artwork: true,
                liking: false,
                sharing: true
            }
        );
        this.currentIndex = index;
    }

    playNext() {
        var nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.trackIds.length) {
            nextIndex = 0;
        }
        this.loadTrack(nextIndex);
        this.playOnLoad()
    }

    playPrev() {
        var nextIndex = this.currentIndex - 1;
        if (nextIndex < 0) {
            nextIndex = this.trackIds.length - 1;
        }
        this.loadTrack(nextIndex);
        this.playOnLoad()
    }

    playToggle() {
        this.widget.toggle();
    }

    onTrackFinished() {
        this.playNext();
    }
}

