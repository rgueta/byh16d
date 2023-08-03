import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgesComponent } from './badges/badges.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './media/media.component';
import { PagesComponent } from './pages/pages.component';
import { PedestrianComponent } from './pedestrian/pedestrian.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'products', component: PedestrianComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'coupens', component: BadgesComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'media', component: MediaComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
