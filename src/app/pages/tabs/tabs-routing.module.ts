import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'player',
        loadChildren: () => import('../player/player.module').then(m => m.PlayerPageModule)
      },
      {
        path: 'radio',
        loadChildren: () => import('../radio/radio.module').then(m => m.RadioPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/player',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/player',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
