import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { cardsRoute, homeRoute, PageType, settingsRoute, transactionsRoute } from '../models/route-models';

@Injectable({
  providedIn: 'root'
})
export class CustomRouteService {

  constructor(
    private router: Router,
  ) {
    router.events.subscribe((val: NavigationEnd) => {
      if(!(val instanceof NavigationEnd)) return;

      this.PageType = this.convertStringToPageType(val.url);
    })
  }

  public PageType: PageType; 

  convertStringToPageType(route: string): PageType {
    route = route.replace('/', '');
    switch(route) {
      case '':
        return PageType.Home;
      case homeRoute:
        return PageType.Home;
      case cardsRoute:
        return PageType.Cards;
      case transactionsRoute:
        return PageType.Transactions;
      case settingsRoute:
        return PageType.Settings;
      default:
        return PageType.Home;
    }
  }
}
