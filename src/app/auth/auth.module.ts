import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    PasswordResetFormComponent,
    PasswordResetRequestComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,FormsModule, ReactiveFormsModule,HttpClientModule,SharedModuleModule
  ]
})
export class AuthModule { }
