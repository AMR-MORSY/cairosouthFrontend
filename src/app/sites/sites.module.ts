
import { SearchResultsComponent } from './search-results/search-results.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { NgModule } from '@angular/core';
import { UpdateCascadesComponent } from './update-cascades/update-cascades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SitesRoutingModule } from './sites-routing.module';
import { CommonModule } from '@angular/common';
import { CreateNewSiteComponent } from './create-new-site/create-new-site.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';








@NgModule({
  declarations: [
    UpdateCascadesComponent,
    SiteDetailsComponent,
    SearchResultsComponent,
    CreateNewSiteComponent,
    LoadingScreenComponent,
 


  ],
  imports: [

    CommonModule,
  HttpClientModule,FormsModule,ReactiveFormsModule, NgxPaginationModule,SitesRoutingModule,BsDatepickerModule.forRoot()
  ]
})
export class SitesModule { }
