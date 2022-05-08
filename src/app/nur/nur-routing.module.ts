import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSiteNurComponent } from './create-site-nur/create-site-nur.component';
import { NurIndexComponent } from './nur-index/nur-index.component';
import { ShowNurComponent } from './show-nur/show-nur.component';
import { AdminGuardGuard } from '../auth/admin-guard.guard';
import { ShowSiteNurComponent } from './show-site-nur/show-site-nur.component';
import { AuthGuardGuard } from '../auth/auth-guard.guard';

const routes: Routes = [
  { path: 'create-site-nur',canActivate:[AuthGuardGuard,AdminGuardGuard] ,component: CreateSiteNurComponent },
  { path: 'show-site-nur',canActivate:[AuthGuardGuard], component: ShowSiteNurComponent },
  { path: 'show-nur',canActivate:[AuthGuardGuard], component: ShowNurComponent },
  { path: 'nur-index',canActivate:[AuthGuardGuard], component: NurIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurModuleRoutingModule { }
