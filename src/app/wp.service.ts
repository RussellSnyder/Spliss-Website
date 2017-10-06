import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../environments/environment";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import {SiteDataModel} from "./models/SiteDataModel";
import {Slugify} from "./pipes/slugify.pipe";

@Injectable()
export class WpService {
    siteData = null;
    cacheKey = '';

    constructor(private http: Http, private siteDataModel: SiteDataModel, private slugify: Slugify) {
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
        if (this.siteData) {
            return this.siteData
        }
        this.siteData = this.siteDataModel.parseSiteData(pageData, imageData);
        localStorage.setItem(this.cacheKey, JSON.stringify(this.siteData));

        return this.siteData
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
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).substring(0, 12) == 'spliss-site-' && localStorage.key(i) !== this.cacheKey) {
                arr.push(localStorage.key(i));
            }
        }
        arr.forEach(item => localStorage.removeItem(item))
    }

    getAlbumByTitleSlug(titleSlug) {
        let data = this.getSiteData();
        if (typeof data.then == 'function') {
            return this.getSiteData().then(data => {
                return this.getAlbumInSiteData(titleSlug, data);
            })
        } else {
            return this.getAlbumInSiteData(titleSlug, data);
        }
    }

    getAlbumInSiteData(title, data) {
        return data.albums.find((album) => {
            return title === this.slugify.transform(album.title);
        });
    }

    getTrackByTitleSlug(titleSlug) {
        let data = this.getSiteData();
        if (typeof data.then == 'function') {
            return this.getSiteData().then(data => {
                return this.getTrackInSiteData(titleSlug, data);
            })
        } else {
            return this.getTrackInSiteData(titleSlug, data);
        }
    }

    getTrackInSiteData(title, data) {
        let trackData = null;
        data.albums.forEach((album) => {
            album.tracks.forEach(track => {
                if (title === this.slugify.transform(track.title)) {
                    trackData = track
                }
            })
        });
        return trackData;
    }


}