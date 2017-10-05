import {Component, OnInit} from '@angular/core';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
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
