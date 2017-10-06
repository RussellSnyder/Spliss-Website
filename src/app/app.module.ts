import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { Slugify } from './pipes/slugify.pipe';
import {AppComponent} from './app.component';
import {WpService} from "./wp.service";
import {HttpModule} from "@angular/http";
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from './home/home.component';
import {SorryComponent} from './sorry/sorry.component';
import {LoadingComponent} from './loading/loading.component';
import {AudioPlayerComponent} from './audio-player/audio-player.component';
import {AnimatedLogoComponent} from './animated-logo/animated-logo.component';
import {SocialSharingComponent} from './social-sharing/social-sharing.component';
import {EventsComponent} from './events/events.component';
import {ContactComponent} from './contact/contact.component';
import {MusicComponent} from './music/music.component';
import {FacebookComponent} from './facebook/facebook.component';
import {FacebookModule} from "ngx-facebook";
import { FooterComponent } from './footer/footer.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SiteDataModel} from "./models/SiteDataModel";
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';
import {ReviewsComponent} from "./reviews/reviews.component";
import {DownloadCodeService} from "./download-code.service";
import { environment } from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        SorryComponent,
        LoadingComponent,
        AudioPlayerComponent,
        AnimatedLogoComponent,
        SocialSharingComponent,
        EventsComponent,
        ContactComponent,
        MusicComponent,
        FacebookComponent,
        FooterComponent,
        AnnouncementComponent,
        EscapeHtmlPipe,
        Slugify,
        TrackComponent,
        AlbumComponent,
        ReviewsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        AppRoutingModule,
        FacebookModule.forRoot(),
    ],
    providers: [WpService, SiteDataModel, Slugify, DownloadCodeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
