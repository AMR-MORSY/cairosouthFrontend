import { UpdateModificationComponent } from './update-modification/update-modification.component';
import { CreateNewModificationComponent } from './create-new-modification/create-new-modification.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowSiteModificationsComponent } from './show-site-modifications/show-site-modifications.component';
import { AllModificationsComponent } from './all-modifications/all-modifications.component';

const routes: Routes = [
  { path: 'create-new-modification', component: CreateNewModificationComponent },
  { path: 'update-modifications', component:UpdateModificationComponent },
  { path: 'show-site-modifications', component:ShowSiteModificationsComponent },
  { path: 'all-modifications', component:AllModificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificationsRoutingModule { }
