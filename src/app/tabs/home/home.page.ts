import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ComponentRef } from '@ionic/core';
import { AddFundCreditCardComponent } from 'src/app/components/modals/add-fund-credit-card/add-fund-credit-card.component';
import { AddFundTransferComponent } from 'src/app/components/modals/add-fund-transfer/add-fund-transfer.component';

import { BankTransferComponent } from 'src/app/components/modals/bank-transfer/bank-transfer.component';
import { BeaconTransferComponent } from 'src/app/components/modals/beacon-transfer/beacon-transfer.component';
import { BuyAirtimeComponent } from 'src/app/components/modals/buy-airtime/buy-airtime.component';
import { BuyCurrencyComponent } from 'src/app/components/modals/buy-currency/buy-currency.component';
import { PayBillsComponent } from 'src/app/components/modals/pay-bills/pay-bills.component';
import { ReferralsComponent } from 'src/app/components/modals/referrals/referrals.component';
import { SellCurrencyComponent } from 'src/app/components/modals/sell-currency/sell-currency.component';
import { IHomePageOptions } from 'src/app/models/app-pages-model';
import { addFundCreditCardModalID, addFundTransferModalID, bankTransferModalID, beaconTransferModalID, buyAirtimeModalID, buyCurrencyModalID, fundCardAlertID, payBillsModalID, referralsModalID, sellCurrencyModalID, transferAlertID } from 'src/app/models/component-id';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
  ) { }

  public FundAccountText = 'Fund Account';
  public PayBillText = 'Pay Bills';
  public TransferMoneyText = 'Transfer Money';
  public BuyAirtimeText = 'Buy Airtime';
  public MoreInfoText = 'A little creative about Life Beacon Cash';
  public StartEarningText = 'Start Earning';
  public CurrencyExText = 'Currency Exchange';


  public options: IHomePageOptions[] = [
    {
      title: 'Fund Account',
      icon: 'wallet',
      backGround: 'success',
      handler: async () => {
        const alert = await this.alertCtrl.create({
          header: 'Add Fund',
          id: fundCardAlertID,
          cssClass: 'alert-wide',
          inputs: [
            {
              type: 'radio',
              label: 'Via Transfer',
              value: FundOptions.ViaTranfer,
            },
            {
              type: 'radio',
              label: 'Via Payment Gateway',
              value: FundOptions.ViaGateway,
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Ok',
              handler: (e) => {
                if(e ==  undefined) return false;
                if(e == FundOptions.ViaTranfer) {
                  this.showModalAsync(AddFundTransferComponent, addFundTransferModalID);
                }
                else if(e == FundOptions.ViaGateway){
                  this.showModalAsync(AddFundCreditCardComponent, addFundCreditCardModalID);
                }
              },
            }
          ]
        });

        return await alert.present();
      }
    },
    {
      title: 'Pay Bills',
      icon: 'cash',
      backGround: 'danger',
      handler: () => {
        this.showModalAsync(PayBillsComponent, payBillsModalID);
      }
    },
    {
      title: 'Transfer Money',
      icon: 'swap-vertical',
      backGround: 'secondary',
      handler: async () => {
        const alert = await this.alertCtrl.create({
          header: 'Transfer Money',
          id: transferAlertID,
          cssClass: 'alert-wide',
          inputs: [
            {
              type: 'radio',
              label: 'To BeaconCash Account',
              value: TransferOptions.ToBeacon,
            },
            {
              type: 'radio',
              label: 'To Other Bank',
              value: TransferOptions.ToBank,
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Ok',
              handler: (e) => {
                if(e ==  undefined) return false;
                if(e == TransferOptions.ToBeacon) {
                  this.showModalAsync(BeaconTransferComponent, beaconTransferModalID);
                }
                else if(e == TransferOptions.ToBank){
                  this.showModalAsync(BankTransferComponent, bankTransferModalID);
                }
              },
            }
          ]
        });

        return await alert.present();
      }
    },
    {
      title: 'Buy Airtime',
      icon: 'call',
      backGround: 'warning',
      handler: () => {
        this.showModalAsync(BuyAirtimeComponent, buyAirtimeModalID);
      }
    },

  ]

  ngOnInit() {
  }

  async showModalAsync(component: ComponentRef, id?: string) {
    if(!id) id = '';
    const modal = await this.modalCtrl.create({
      component,
      id,
    })

    return await modal.present();
  }

  showReferrals(){
    this.showModalAsync(ReferralsComponent, referralsModalID);
  }

  async showCurrencyExchange() {
    const alert = await this.alertCtrl.create({
      header: 'Exchange Currency',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (e) => {
            if(e == undefined) return false;

            if(e == ExchangeOptions.Buy) {
              this.showModalAsync(BuyCurrencyComponent, buyCurrencyModalID);
            }
            else if(e == ExchangeOptions.Sell) {
              this.showModalAsync(SellCurrencyComponent, sellCurrencyModalID);
            }
          },
        }
      ],
      inputs: [
        {
          type: 'radio',
          label: 'Buy Currency',
          value: ExchangeOptions.Buy,
        },
        {
          type: 'radio',
          label: 'Sell Currency',
          value: ExchangeOptions.Sell,
        },
      ],

    });

    return await alert.present();
  }


}

enum FundOptions{
  ViaTranfer,
  ViaGateway,
}

enum ExchangeOptions{
  Buy,
  Sell
}

enum TransferOptions{
  ToBeacon,
  ToBank
}

