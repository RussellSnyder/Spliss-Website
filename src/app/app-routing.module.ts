import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {SorryComponent} from "./sorry/sorry.component";
import {HearComponent} from "./hear/hear.component";
import {SeeComponent} from "./see/see.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'about', component: AboutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'hear', component: HearComponent},
    {path: 'see', component: SeeComponent},
    {path: 'sorry', component: SorryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
