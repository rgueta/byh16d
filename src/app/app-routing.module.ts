import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './media/media.component';
import { PagesComponent } from './pages/pages.component';
import { PeatonalComponent } from './peatonal/peatonal.component';
import { SettingsComponent } from './settings/settings.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'peatonal', component: PeatonalComponent,canActivate:[AuthGuard]},
  {path: 'estadisticas', component: EstadisticasComponent,canActivate:[AuthGuard]},
  {path: 'tarjetas', component: TarjetasComponent,canActivate:[AuthGuard]},
  {path: 'pages', component: PagesComponent,canActivate:[AuthGuard]},
  {path: 'media', component: MediaComponent,canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
