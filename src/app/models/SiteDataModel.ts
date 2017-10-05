export class SiteDataModel {
    parseSiteData(pageData, imageData) {
        const acf = pageData.acf;

        console.log(acf)


        const home = {
            title: pageData.title.pageData,
            body: pageData.content.rendered,
        }

        const about = {
            title: acf.about_title,
            subtitle: acf.about_subtitle,
            body: acf.about_body,
        }

        const events = {
            title: acf.events_title,
            body: acf.events_body,
            contact: acf.events_contact_text,
        }

        const music = {
            title: acf.music_title,
            body: acf.music_body,
        }

        const albums = acf.albums.map(album => {
            return {
                title: album.album_title,
                artwork: album.album_artwork ? this.parseAcfImageData(album.album_artwork) : '',
                body: album.album_description,
                download: album.album_download,
                tracks: album.tracks.map(track => {
                    return {
                        title: track.track_title,
                        body: track.track_description,
                        stream: track.dropbox_stream,
                        download: track.dropbox_download,
                        artwork: track.main_art_work ? this.parseAcfImageData(track.main_art_work) : '',
                        extra: track.extra_description
                    }
                })
            }
        })

        const contact = {
            title: acf.contact_title,
            body: acf.contact_information,
        }

        const featuredMusic = {
            title: acf.featured_music_title,
            subtitle: acf.featured_music_subtitle,
            type: acf.featured_music_type,
            playlist: acf.featured_music_playlist
        }

        const footer = {
            body: acf.footer
        }

        const announcement = {
            body: acf.announcement,
            startTime: acf.announcement_start_time,
            endTime: acf.announcement_end_time,
        }

        const mainImage = imageData ? this.parseImageData(imageData.json()) : '';

        return {
            mainImage: mainImage,
            home: home,
            about: about,
            events: events,
            music: music,
            albums: albums,
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

    parseAcfImageData(data) {
        return {
            src: data.url,
            height: data.height,
            width: data.width,
        };
    }

}