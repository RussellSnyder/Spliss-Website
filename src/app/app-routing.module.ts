import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {SorryComponent} from "./sorry/sorry.component";
import {MusicComponent} from "./music/music.component";
import {EventsComponent} from "./events/events.component";
import {ContactComponent} from "./contact/contact.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'about', component: AboutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'music', component: MusicComponent},
    {path: 'events', component: EventsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'sorry', component: SorryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
