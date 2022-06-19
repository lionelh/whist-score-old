import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultManagementComponent } from './pages/result-management/result-management.component';

const routes: Routes = [
  { path: '', component: ResultManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
