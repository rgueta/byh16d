import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PeatonalComponent } from './peatonal/peatonal.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { PagesComponent } from './pages/pages.component';
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { ClickOutsideDirective } from './dashboard/clickOutside.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ImplicitReceiver } from '@angular/compiler';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from "../app/interceptors/jwt.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    PeatonalComponent,
    EstadisticasComponent,
    TarjetasComponent,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
