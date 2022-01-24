import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    UsersRoutingModule, HttpClientModule,FormsModule,ReactiveFormsModule, NgxPaginationModule
  ]
})
export class UsersModule { }
