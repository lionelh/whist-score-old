import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultManagementComponent } from './pages/result-management/result-management.component';

import { ResultRoutingModule } from './result-routing.module';

@NgModule({
  declarations: [
      ResultManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResultRoutingModule
  ],
})
export class ResultModule { }
