import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractManagementComponent } from './pages/contract-management/contract-management.component';

@NgModule({
  declarations: [
    ContractManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContractRoutingModule
  ],
})
export class ContractModule { }
