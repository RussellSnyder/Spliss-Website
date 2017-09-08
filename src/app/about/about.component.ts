import {Component, OnInit} from '@angular/core';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  page = 'about';
  pageData;
  imageData = null;

  constructor(private wpService: WpService) {}

  ngOnInit() {
    this.wpService.getWpPageData(environment.pageIds[this.page])
        .subscribe(res => {
          this.pageData = this.wpService.parsePageData(res.json());
          this.wpService.getWpImageData(this.pageData.image)
              .subscribe(res => {
                this.imageData = this.wpService.parseImageData(res.json())
                console.log(this.imageData)
              })
        })
  }

}
