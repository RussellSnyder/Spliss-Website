import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WpService} from "../wp.service";
import $ from "jquery";
import {DownloadCodeService} from "../download-code.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albumTitle: string;
  data;
  successMessage = null;
  errorMessage = null;
  checkingCode = false;

  @ViewChild('downloadCode') downloadCode;

  constructor(private route: ActivatedRoute, private wpService: WpService, private dcService: DownloadCodeService) {
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
    this.initializeForm()
  }

  checkDownloadCode() {
    let code = this.downloadCode.nativeElement.value;
    this.checkingCode = true;
    this.dcService.isCodeValid(code).then(success => {
          if (success) {
            this.successMessage = 'Thank you for downloading our Album! Download commencing....';
            setTimeout(() => {
              window.open(this.data.download);
              this.initializeForm();
              $('#download-album .close').click();
            }, 2000)
          } else {
            this.errorMessage = 'Sorry, that download code doesn\'t work. <br> Please Contact us if we made a mistake :-/'
          }
          this.checkingCode = false;
      })
  }

  private initializeForm() {
    this.successMessage = null;
    this.errorMessage = null;
  }



}
