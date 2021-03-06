import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { NurModuleRoutingModule } from './nur-routing.module';
import { CreateSiteNurComponent } from './create-site-nur/create-site-nur.component';
import { ShowSiteNurComponent } from './show-site-nur/show-site-nur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NurIndexComponent } from './nur-index/nur-index.component';
import { ShowNurComponent } from './show-nur/show-nur.component';
import {NgChartsModule} from 'ng2-charts';
import { SharedModuleModule } from '../shared-module/shared-module.module';





@NgModule({
  declarations: [
    CreateSiteNurComponent,
    ShowSiteNurComponent,
    NurIndexComponent,
    ShowNurComponent,


  ],
  imports: [
    CommonModule,
    NgChartsModule,SharedModuleModule,
    NurModuleRoutingModule, HttpClientModule,FormsModule,ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),BsDatepickerModule.forRoot()
  ],
  providers:[DatePipe]
})
export class NurModuleModule { }
