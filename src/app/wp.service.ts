import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environments/environment";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class WpService {
    siteData = null;
    cacheKey = '';

    constructor(private http: Http) {
        var d = new Date();
        this.cacheKey = "spliss-site-" + d.getDay() + '-' + d.getHours()
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

        var events = {
            title: acf.events_title,
            body: acf.events_body,
            contact: acf.events_contact_text,
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
            events: events,
            music: music,
            contact: contact,
            featuredMusic: featuredMusic
        }

        localStorage.setItem(this.cacheKey, JSON.stringify(this.siteData));

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

        var localSiteData = localStorage.getItem(this.cacheKey)
        if (localSiteData) {
            this.siteData = JSON.parse(localSiteData);
            this.clearOlderVersions();
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

    clearOlderVersions() {
        var arr = []; // Array to hold the keys
        // Iterate over localStorage and insert the keys that meet the condition into arr
        for (var i = 0; i < localStorage.length; i++){
            if (localStorage.key(i).substring(0,12) == 'spliss-site-' && localStorage.key(i) !== this.cacheKey) {
                arr.push(localStorage.key(i));
            }
        }
        arr.forEach(item => localStorage.removeItem(item))
    }

}