import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,FormsModule, ReactiveFormsModule,HttpClientModule
  ]
})
export class AdminModule { }
