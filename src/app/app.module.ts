import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WpService } from "./wp.service";
import { HttpModule } from "@angular/http";
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { SorryComponent } from './sorry/sorry.component';
import { LoadingComponent } from './loading/loading.component';
import { HearComponent } from './hear/hear.component';
import { SeeComponent } from './see/see.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    SorryComponent,
    LoadingComponent,
    HearComponent,
    SeeComponent,
    AudioPlayerComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [WpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
