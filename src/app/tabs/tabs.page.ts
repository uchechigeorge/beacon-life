import { Component } from '@angular/core';
import { IAppPages } from '../models/app-pages-model';
import { cardsRoute, homeRoute, PageType, settingsRoute, transactionsRoute } from '../models/route-models';
import { CustomRouteService } from '../services/custom-route.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public AppPages: IAppPages[] = [
    {
      title: 'Home',
      url: homeRoute,
      icon: 'home',
      pageType: PageType.Home
    },
    {
      title: 'Cards',
      url: cardsRoute,
      icon: 'card',
      pageType: PageType.Cards
    },
    {
      title: 'Transactions',
      url: transactionsRoute,
      icon: 'swap-vertical',
      pageType: PageType.Transactions
    },
    {
      title: 'Settings',
      url: settingsRoute,
      icon: 'settings',
      pageType: PageType.Settings
    }
  ]

  constructor(
    public customRoute: CustomRouteService

  ) {}

}
