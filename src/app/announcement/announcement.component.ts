import {Component, OnInit} from '@angular/core';
import {WpService} from "../wp.service";
import {trigger, state, style, transition, animate} from "@angular/animations";

@Component({
    selector: 'app-announcement',
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.css'],
    animations: [
        trigger('visibilityState', [
            state('visible', style({
                'max-height': '200px',
                opacity: 1,
            })),
            state('hidden', style({
                opacity: 0,
                'max-height': 0,
            })),
            transition('visible => hidden', animate(500)),
            transition('hidden => visible', animate(1500))
        ])
    ]
})
export class AnnouncementComponent implements OnInit {
    data;
    visibility = "hidden";

    constructor(private wpService: WpService) {
    }

    ngOnInit() {
        let data = this.wpService.getSiteData();
        if (typeof data.then == 'function') {
            this.wpService.getSiteData().then(data => {
                this.data = data;
                this.toggleAnnouncement(data.announcement)
            })
        } else {
            this.data = data;
            this.toggleAnnouncement(data.announcement)
        }

    }

    toggleAnnouncement(announcementData) {
        let {endTime, startTime} = announcementData;
        if (startTime < endTime) {
            setTimeout(() => this.visibility = 'visible', 2000)
        }
    }

    hideAnnouncement() {
        this.visibility = 'hidden';
    }
}
