import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';


import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"logout",canActivate:[AuthGuardGuard], component:LogoutComponent},
  {path:"login/password-reset-request",component:PasswordResetRequestComponent},
  {path:"password-reset-form",component:PasswordResetFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
