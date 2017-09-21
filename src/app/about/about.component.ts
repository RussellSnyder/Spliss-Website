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
    imageData;

    constructor(private wpService: WpService) {}

    ngOnInit() {
        this.wpService.getWpBasicPageData(environment.pageIds[this.page]).then(data => {
            this.pageData = data.pageData;
            this.imageData = data.imageData;
        })
    }
}
