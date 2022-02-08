import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ModificationsRoutingModule } from './modifications-routing.module';
import { CreateNewModificationComponent } from './create-new-modification/create-new-modification.component';
import { UpdateModificationComponent } from './update-modification/update-modification.component';
import { ShowSiteModificationsComponent } from './show-site-modifications/show-site-modifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';




@NgModule({
  declarations: [
    CreateNewModificationComponent,
    UpdateModificationComponent,
    ShowSiteModificationsComponent
  ],
  imports: [
    CommonModule,
    ModificationsRoutingModule,FormsModule,ReactiveFormsModule,BsDatepickerModule.forRoot(),ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [DatePipe],
})
export class ModificationsModule { }
