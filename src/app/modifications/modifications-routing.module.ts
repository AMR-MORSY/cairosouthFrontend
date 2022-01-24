import { UpdateModificationComponent } from './update-modification/update-modification.component';
import { CreateNewModificationComponent } from './create-new-modification/create-new-modification.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create-new-modification', component: CreateNewModificationComponent },
  { path: 'update-modifications', component:UpdateModificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificationsRoutingModule { }
