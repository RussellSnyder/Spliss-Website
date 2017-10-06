import {Component, OnInit, ViewChildren} from '@angular/core';
import {WpService} from "../wp.service";
import {DownloadCodeService} from "../download-code.service";

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
    @ViewChildren('trackDescription') trackDescriptions;
    data;
    readmoreLength = 100;

    constructor(private wpService: WpService, private dcService: DownloadCodeService) {}

    ngOnInit() {
        let data = this.wpService.getSiteData();
        if (typeof data.then == 'function') {
            this.wpService.getSiteData().then(data => {
                this.data = data;
                this.getDownloadCodes()
            })
        } else {
            this.data = data;
            this.getDownloadCodes()
        }
    }

    getDownloadCodes() {
        let albumsAndTracks = this.wpService.getAllAlbumsAndTrackNames(this.data);
        let dlCodes = this.dcService.getDownloadCodes();
        let allCodes = [];
        dlCodes.forEach(dlCode => {
            albumsAndTracks.albums.forEach(album => allCodes.push(this.dcService.generateCodeFromTitle(album) + dlCode));
            albumsAndTracks.tracks.forEach(track => allCodes.push(this.dcService.generateCodeFromTitle(track) + dlCode))
        })
        // console.log(allCodes);
    }
}
