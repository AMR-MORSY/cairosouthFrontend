import { AuthGuardGuard } from './auth/auth-guard.guard';

import { SearchResultsComponent } from './search-results/search-results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { UserComponent } from './user/user.component';
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'search-results',canActivate:[AuthGuardGuard], component: SearchResultsComponent },
  { path: 'site-details',canActivate:[AuthGuardGuard], component: SiteDetailsComponent },
  { path: 'user',canActivate:[AuthGuardGuard] ,component:UserComponent },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',canActivate:[AuthGuardGuard],canActivateChild:[AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'superAdmin',
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
