import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { GameManagementComponent } from './pages/game-management/game-management.component';

@NgModule({
  declarations: [
    GameManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameRoutingModule
  ],
})
export class GameModule { }