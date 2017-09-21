import {Component, OnInit} from '@angular/core';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-hear',
    templateUrl: './hear.component.html',
    styleUrls: ['./hear.component.css']
})
export class HearComponent implements OnInit {
    page = 'hear';
    pageData;
    imageData;

    constructor(private wpService: WpService) {
    }

    ngOnInit() {
        this.wpService.getWpBasicPageData(environment.pageIds[this.page]).then(data => {
            this.pageData = data.pageData;
            this.imageData = data.imageData;
        })
    }
}
