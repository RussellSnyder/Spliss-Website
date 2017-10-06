import {Component, ViewEncapsulation} from '@angular/core';
import {environment} from "../environments/environment";
import 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation : ViewEncapsulation.None,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    constructor() {
        firebase.initializeApp(environment.firebase)
    }
}
