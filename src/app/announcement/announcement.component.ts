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
        let DateObject = new Date();
        let now = this.getToday(DateObject) + ' ' + this.getTimeNow(DateObject);
        if (startTime < endTime && endTime > now) {
            setTimeout(() => this.visibility = 'visible', 2000)
        }
    }

    hideAnnouncement() {
        this.visibility = 'hidden';
    }

    getToday(DateObject) {
        return `${DateObject.getFullYear()}-${(DateObject.getMonth() + 1) < 10 ? "0" : ""}${DateObject.getMonth() + 1}-${(DateObject.getDay() + 1) < 10 ? "0" : ""}${DateObject.getDay()+1}`
    }

    getTimeNow(DateObject) {
        return ((DateObject.getHours() < 10) ? "0" : "") + DateObject.getHours() + ":" + ((DateObject.getMinutes() < 10) ? "0" : "") + DateObject.getMinutes() + ":" + ((DateObject.getSeconds() < 10) ? "0" : "") + DateObject.getSeconds();
    }
}
