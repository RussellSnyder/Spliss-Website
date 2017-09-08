import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environments/environment";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class WpService {
    constructor(private http: Http) {
    }

    getWpPageData(pageId) {
        return this.http.get(environment.rootUrl + 'wp-json/wp/v2/pages/' + pageId)
    };

    getWpImageData(mediaId) {
        return this.http.get(environment.rootUrl + 'wp-json/wp/v2/media/' + mediaId)
    };

    parsePageData(data) {
        return {
            title: data.title.rendered,
            main: data.content.rendered,
            image: data.featured_media
        };
    }

    parseImageData(data) {
        return {
            src: data.source_url
        };
    }

}