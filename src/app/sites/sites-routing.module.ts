import { UpdateCascadesComponent } from '../sites/update-cascades/update-cascades.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { CreateNewSiteComponent } from './create-new-site/create-new-site.component';


const routes: Routes = [
  { path: 'update-cascades', component: UpdateCascadesComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'site-details', component: SiteDetailsComponent },
  { path: 'create-new-site', component: CreateNewSiteComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
