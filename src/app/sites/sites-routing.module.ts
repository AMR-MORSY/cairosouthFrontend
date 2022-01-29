import { UpdateCascadesComponent } from '../sites/update-cascades/update-cascades.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { CreateNewSiteComponent } from './create-new-site/create-new-site.component';
import { AllSitesComponent } from './all-sites/all-sites.component';
import { UpdateSiteComponent } from './update-site/update-site.component';


const routes: Routes = [
  { path: 'update-cascades', component: UpdateCascadesComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'site-details', component: SiteDetailsComponent },
  { path: 'create-new-site', component: CreateNewSiteComponent },
  { path: 'allSites', component: AllSitesComponent },
  { path: 'update-site', component: UpdateSiteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
