import { Component, OnInit } from '@angular/core';
import {WpService} from "../wp.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  data;

  constructor(private wpService: WpService) {}

  ngOnInit() {
    let data = this.wpService.getSiteData();
    if (typeof data.then == 'function') {
      this.wpService.getSiteData().then(data => {
        this.data = data;
      })
    } else {
      this.data = data;
    }
  }
}
