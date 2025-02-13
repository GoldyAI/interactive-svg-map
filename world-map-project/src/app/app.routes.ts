import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' }, // ✅ Redirects root to /map
  { path: 'map', component: MapComponent } // ✅ Loads MapComponent when on /map
];
