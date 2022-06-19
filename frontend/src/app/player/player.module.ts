import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerManagementComponent } from './pages/player-management/player-management.component';

import { PlayerRoutingModule } from './player-routing.module';

@NgModule({
  declarations: [
      PlayerManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlayerRoutingModule
  ],
})
export class PlayerModule { }
