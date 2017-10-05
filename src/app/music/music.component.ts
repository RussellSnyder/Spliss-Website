import {Component, OnInit, ViewChildren} from '@angular/core';
import {WpService} from "../wp.service";


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  @ViewChildren('trackDescription') trackDescriptions;
  data;
  readmoreLength = 100;
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
