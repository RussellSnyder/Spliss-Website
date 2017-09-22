import {Component, OnInit} from '@angular/core';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
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
