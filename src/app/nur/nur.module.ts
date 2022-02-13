import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { NurModuleRoutingModule } from './nur-routing.module';
import { CreateSiteNurComponent } from './create-site-nur/create-site-nur.component';
import { ShowSiteNurComponent } from './show-site-nur/show-site-nur.component';
import { ShowAllNurComponent } from './show-all-nur/show-all-nur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CreateSiteNurComponent,
    ShowSiteNurComponent,
    ShowAllNurComponent,

  ],
  imports: [
    CommonModule,
    NurModuleRoutingModule, HttpClientModule,FormsModule,ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers:[DatePipe]
})
export class NurModuleModule { }