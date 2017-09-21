import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environments/environment";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class WpService {
    siteData = null;

    constructor(private http: Http) {
    }

    getWpPageData(pageId) {
        return this.http.get(environment.rootUrl + 'wp-json/wp/v2/pages/' + pageId)
    };

    getWpImageData(mediaId) {
        return this.http.get(environment.rootUrl + 'wp-json/wp/v2/media/' + mediaId)
    };

    parseSiteData(pageData, imageData) {
        var acf = pageData.acf;

        var home = {
            title: pageData.title.rendered,
            body: pageData.content.rendered,
        }

        var about = {
            title: acf.about_title,
            subtitle: acf.about_subtitle,
            body: acf.about_body,
        }

        var music = {
            title: acf.music_title,
            body: acf.music_body,
        }

        var contact = {
            title: acf.contact_title,
            body: acf.contact_information,
        }

        var featuredMusic = {
            title: acf.featured_music_title,
            subtitle: acf.featured_music_subtitle,
            type: acf.featured_music_type,
            playlist: acf.featured_music_playlist
        }

        var mainImage = imageData ? this.parseImageData(imageData.json()) : '';

        this.siteData = {
            mainImage: mainImage,
            home: home,
            about: about,
            music: music,
            contact: contact,
            featuredMusic: featuredMusic
        }

        return this.siteData
    }

    parseImageData(data) {
        return {
            src: data.source_url,
            height: data.media_details.height,
            width: data.media_details.width,
        };
    }

    getWpBasicPageData(pageId) {
        // if (this.siteData) {
        //     return this.siteData
        // }

        let pageData;
        return this.getWpPageData(pageId)
            .toPromise()
            .then(data => {
                pageData = data.json();
                return pageData.featured_media;
            })
            .then(imageId => {
                if (imageId) {
                    return this.getWpImageData(imageId).toPromise()
                }
                else {
                    return null;
                }
            })
            .then(imageData => {
                return this.parseSiteData(pageData, imageData)
            })
    }

    getSiteData() {
        if (this.siteData) {
            return this.siteData
        }

        let pageData;
        return this.getWpPageData(environment.siteId)
            .toPromise()
            .then(data => {
                pageData = data.json();
                return pageData.featured_media;
            })
            .then(imageId => {
                if (imageId) {
                    return this.getWpImageData(imageId).toPromise()
                }
                else {
                    return null;
                }
            })
            .then(imageData => {
                return this.parseSiteData(pageData, imageData)
            })
    }

}