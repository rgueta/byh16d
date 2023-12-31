import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PedestrianComponent } from './pedestrian/pedestrian.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BadgesComponent } from './badges/badges.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { ClickOutsideDirective } from './dashboard/clickOutside.directive';
import { HttpClientModule } from "@angular/common/http";
import { ImplicitReceiver } from '@angular/compiler';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    PedestrianComponent,
    StatisticsComponent,
    BadgesComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    ClickOutsideDirective,
    SearchPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
