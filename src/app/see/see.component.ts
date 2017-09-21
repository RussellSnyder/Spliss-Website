import {Component} from '@angular/core';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements Component {
  page = 'see';
  pageData;
  imageData = null;

  constructor(private wpService: WpService) {}

  ngOnInit() {
    // this.wpService.getWpPageData(environment.pageIds[this.page])
    //     .subscribe(res => {
    //       this.pageData = this.wpService.parseSiteData(res.json());
    //       this.wpService.getWpImageData(this.pageData.image)
    //           .subscribe(res => {
    //             this.imageData = this.wpService.parseImageData(res.json())
    //           })
    //     })
  }
}
