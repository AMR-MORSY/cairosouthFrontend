import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificationsRoutingModule } from './modifications-routing.module';
import { CreateNewModificationComponent } from './create-new-modification/create-new-modification.component';
import { UpdateModificationComponent } from './update-modification/update-modification.component';


@NgModule({
  declarations: [
    CreateNewModificationComponent,
    UpdateModificationComponent
  ],
  imports: [
    CommonModule,
    ModificationsRoutingModule
  ]
})
export class ModificationsModule { }
