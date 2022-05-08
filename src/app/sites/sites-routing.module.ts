import { UpdateCascadesComponent } from '../sites/update-cascades/update-cascades.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { CreateNewSiteComponent } from './create-new-site/create-new-site.component';
import { AllSitesComponent } from './all-sites/all-sites.component';
import { UpdateSiteComponent } from './update-site/update-site.component';
import { AdminGuardGuard } from '../auth/admin-guard.guard';
import { AuthGuardGuard } from '../auth/auth-guard.guard';


const routes: Routes = [
  { path: 'update-cascades',canActivate:[AuthGuardGuard,AdminGuardGuard] , component: UpdateCascadesComponent },
  { path: 'search-results',canActivate:[AuthGuardGuard], component: SearchResultsComponent },
  { path: 'site-details',canActivate:[AuthGuardGuard], component: SiteDetailsComponent },
  { path: 'create-new-site',canActivate:[AuthGuardGuard,AdminGuardGuard] , component: CreateNewSiteComponent },
  { path: 'allSites',canActivate:[AuthGuardGuard], component: AllSitesComponent },
  { path: 'update-site',canActivate:[AuthGuardGuard,AdminGuardGuard] , component: UpdateSiteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
