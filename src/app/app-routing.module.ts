import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SorryComponent} from "./sorry/sorry.component";
import {MusicComponent} from "./music/music.component";
import {EventsComponent} from "./events/events.component";
import {ContactComponent} from "./contact/contact.component";
import {TrackComponent} from "./track/track.component";
import {AlbumComponent} from "./album/album.component";
import {ReviewsComponent} from "./reviews/reviews.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'reviews', component: ReviewsComponent},
    {path: 'music', component: MusicComponent},
    {path: 'events', component: EventsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'album/:albumTitle', component: AlbumComponent},
    {path: 'track/:trackTitle', component: TrackComponent},
    {path: 'sorry', component: SorryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
