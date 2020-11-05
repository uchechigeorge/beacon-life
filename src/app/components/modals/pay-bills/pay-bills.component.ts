import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IListDetailsOptions } from 'src/app/models/app-pages-model';
import { payBillsModalID } from 'src/app/models/component-id';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.scss'],
})
export class PayBillsComponent implements OnInit {

  public PageTitle: string = 'Pay Bills';

  public InfoText: string = 'Pay your bills with ease';

  public PayBillsOptions: IListDetailsOptions[] = [
    {
      title: 'Cable TV',
      subtitle: 'Pay for decoder subscriptions',
      icon: 'tv',
      handler: async () => {
      }
    },
    {
      title: 'Internet',
      subtitle: 'Buy amazingly affordable data bundles',
      icon: 'wifi',
      handler: () => {
      }
    },
    {
      title: 'Electricity',
      subtitle: 'Pay electric bills with ease',
      icon: 'battery-charging',
      handler: () => {
      }
    },
    {
      title: 'Betting',
      subtitle: 'Bet on your favourite games',
      icon: 'football',
      handler: () => {
      }
    },
    {
      title: 'Transport and Tolls',
      subtitle: 'Pay for trips with ease',
      icon: 'bus',
      handler: () => {
      }
    },
  ]


  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', payBillsModalID);
  }

}
