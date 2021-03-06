import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [
    UsersComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,NgxPaginationModule,FormsModule,ReactiveFormsModule,SuperAdminRoutingModule,SharedModuleModule
  ]
})
export class SuperAdminModule { }
