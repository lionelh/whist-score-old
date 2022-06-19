import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'players', loadChildren: () => import('./player/player.module').then(m => m.PlayerModule) },
  { path: 'roles', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  { path: 'contracts', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule) },
  { path: 'results', loadChildren: () => import('./result/result.module').then(m => m.ResultModule) },
  { path: 'games', loadChildren: () => import('./game/game.module').then(m => m.GameModule) },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
