import { UpdateModificationComponent } from './update-modification/update-modification.component';
import { CreateNewModificationComponent } from './create-new-modification/create-new-modification.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowSiteModificationsComponent } from './show-site-modifications/show-site-modifications.component';
import { AllModificationsComponent } from './all-modifications/all-modifications.component';
import { ModificationIndexComponent } from './modification-index/modification-index.component';
import { AdminGuardGuard } from '../auth/admin-guard.guard';
import { AuthGuardGuard } from '../auth/auth-guard.guard';


const routes: Routes = [
  { path: 'create-new-modification',canActivate:[AuthGuardGuard,AdminGuardGuard], component: CreateNewModificationComponent },
  { path: 'update-modifications',canActivate:[AuthGuardGuard,AdminGuardGuard], component:UpdateModificationComponent },
  { path: 'show-site-modifications',canActivate:[AuthGuardGuard], component:ShowSiteModificationsComponent },
  { path: 'all-modifications',canActivate:[AuthGuardGuard], component:AllModificationsComponent },
  { path: 'modification-index',canActivate:[AuthGuardGuard], component:ModificationIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificationsRoutingModule { }
