import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public options = [
    {
      text: 'Apply for Physical Card',
      handler: () => {

      }
    },
    {
      text: 'Apply for Virtual Card',
      handler: () => {

      }
    },
    {
      text: 'Manage Physical Cash',
      handler: () => {

      }
    },
    {
      text: 'Manage Virtual Cash',
      handler: () => {

      }
    },
  ]
}
