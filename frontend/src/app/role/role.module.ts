import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleManagementComponent } from './pages/role-management/role-management.component';

import { RoleRoutingModule } from './role-routing.module';

@NgModule({
  declarations: [
      RoleManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoleRoutingModule
  ],
})
export class RoleModule { }
