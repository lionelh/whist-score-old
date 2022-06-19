import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractManagementComponent } from './pages/contract-management/contract-management.component';

const routes: Routes = [
  { path: '', component: ContractManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
