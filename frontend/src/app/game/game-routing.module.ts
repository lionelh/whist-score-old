import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameManagementComponent } from './pages/game-management/game-management.component';

const routes: Routes = [
  { path: ':id', component: GameManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
