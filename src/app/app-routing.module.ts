import { AuthGuardGuard } from './auth/auth-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user',canActivate:[AuthGuardGuard] ,component:UserComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'sites',
    loadChildren: () => import('./sites/sites.module').then(m => m.SitesModule)
  },
  {
    path: 'modifications',
    loadChildren: () => import('./modifications/modifications.module').then(m => m.ModificationsModule)
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
