import {Component, OnInit} from '@angular/core';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    page = 'home';
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
