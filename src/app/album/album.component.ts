import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WpService} from "../wp.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albumTitle: string;
  data;

  constructor(private route: ActivatedRoute, private wpService: WpService) {
    this.albumTitle = route.snapshot.params['albumTitle'];
  }

  ngOnInit() {
    let data = this.wpService.getAlbumByTitleSlug(this.albumTitle);
    if (typeof data.then == 'function') {
      data.then(data => {
        this.data = data;
      })
    } else {
      this.data = data;
    }
  }


}
