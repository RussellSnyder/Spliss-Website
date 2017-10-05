import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WpService} from "../wp.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  trackTitle: string;
  data;

  constructor(private route: ActivatedRoute, private wpService: WpService) {
    this.trackTitle = route.snapshot.params['trackTitle'];
  }

  ngOnInit() {
    let data = this.wpService.getTrackByTitleSlug(this.trackTitle);
    if (typeof data.then == 'function') {
      data.then(data => {
        this.data = data;
      })
    } else {
      this.data = data;
    }
  }
}
