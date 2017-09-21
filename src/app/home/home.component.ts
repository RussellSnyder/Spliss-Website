import {Component, OnInit} from '@angular/core';
import {NgStyle} from '@angular/common';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    data;

    constructor(private wpService: WpService) {}

    ngOnInit() {
        this.wpService.getSiteData().then(data => {
            this.data = data;
        })
    }
}
