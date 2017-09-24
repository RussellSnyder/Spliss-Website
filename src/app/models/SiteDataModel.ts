export class SiteDataModel {
    parseSiteData(pageData, imageData) {
        var acf = pageData.acf;

        var home = {
            title: pageData.title.pageData,
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

        var footer = {
            body: acf.footer
        }

        var announcement = {
            body: acf.announcement,
            startTime: acf.announcement_start_time,
            endTime: acf.announcement_end_time,
        }

        var mainImage = imageData ? this.parseImageData(imageData.json()) : '';

        return {
            mainImage: mainImage,
            home: home,
            about: about,
            events: events,
            music: music,
            contact: contact,
            featuredMusic: featuredMusic,
            footer: footer,
            announcement: announcement
        }
    }

    parseImageData(data) {
        return {
            src: data.source_url,
            height: data.media_details.height,
            width: data.media_details.width,
        };
    }

}