import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSiteNurComponent } from './create-site-nur/create-site-nur.component';
import { ShowAllNurComponent } from './show-all-nur/show-all-nur.component';
import { ShowSiteNurComponent } from './show-site-nur/show-site-nur.component';

const routes: Routes = [
  { path: 'create-site-nur', component: CreateSiteNurComponent },
  { path: 'show-site-nur', component: ShowSiteNurComponent },
  { path: 'show-all-nur', component: ShowAllNurComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurModuleRoutingModule { }