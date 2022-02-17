
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'update-user', component: UpdateUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
