import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { cardsRoute, homeRoute, settingsRoute, transactionsRoute } from '../models/route-models';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: homeRoute,
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: cardsRoute,
        loadChildren: () => import('./cards/cards.module').then( m => m.CardsPageModule)
      },
      {
        path: transactionsRoute,
        loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
      },
      {
        path: settingsRoute,
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'cards',
  //   loadChildren: () => import('./cards/cards.module').then( m => m.CardsPageModule)
  // },
  // {
  //   path: 'transactions',
  //   loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
