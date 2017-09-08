import {Component} from '@angular/core';
import {WpService} from "../wp.service";
import {environment} from "../../environments/environment";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements Component {
    page = 'home';
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
                    })
            })
    }
}
