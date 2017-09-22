import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
    @ViewChild('navToggle') navToggle;

    constructor() {

    }

    ngAfterViewInit() {
    }


    closeMenu(e) {
        e.preventDefault();
        if (this.navToggle.nativeElement.className.indexOf('collapsed') === -1) {
            this.navToggle.nativeElement.click();
        }
    }
}
