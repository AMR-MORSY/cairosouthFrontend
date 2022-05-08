import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { AdminGuardGuard } from './auth/admin-guard.guard';
import { SuperAdminGuardGuard } from './auth/super-admin-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatesticsComponent } from './statestics/statestics.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'statestics',canActivate:[AuthGuardGuard] ,component:StatesticsComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'nur',
    canActivate:[AuthGuardGuard] , loadChildren: () => import('./nur/nur.module').then(m => m.NurModuleModule)
  },
  {
    path: 'sites',
    canActivate:[AuthGuardGuard] ,  loadChildren: () => import('./sites/sites.module').then(m => m.SitesModule)
  },
  {
    path: 'modifications',
    canActivate:[AuthGuardGuard] , loadChildren: () => import('./modifications/modifications.module').then(m => m.ModificationsModule)
  },
  {
    path: 'super-admin',
    canActivate:[AuthGuardGuard,SuperAdminGuardGuard] , loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },

  {
    path:'**',component:NotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
