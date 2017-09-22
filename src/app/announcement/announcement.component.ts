import { Component, OnInit } from '@angular/core';
import {WpService} from "../wp.service";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  data;
  shouldShow;
  extraClass;
  clicked = false;

  constructor(private wpService: WpService) {}

  ngOnInit() {
    let data = this.wpService.getSiteData();
    if (typeof data.then == 'function') {
      this.wpService.getSiteData().then(data => {
        this.data = data;
        this.decideIfAnnouncementShouldShow(data.announcement)
      })
    } else {
      this.data = data;
      this.decideIfAnnouncementShouldShow(data.announcement)
    }

  }

  decideIfAnnouncementShouldShow(announcementData) {
    let {endTime, startTime} = announcementData;
    if (startTime < endTime) {
      this.shouldShow = true;
      if (!this.clicked) {
        setTimeout(() => this.extraClass = 'show', 3000)
      }
    }
  }

  hideAnnouncement() {
    this.clicked = true;
    this.extraClass = '';
  }
}
