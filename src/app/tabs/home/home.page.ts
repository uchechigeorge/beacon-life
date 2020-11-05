import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ComponentRef } from '@ionic/core';
import { BuyAirtimeComponent } from 'src/app/components/modals/buy-airtime/buy-airtime.component';
import { PayBillsComponent } from 'src/app/components/modals/pay-bills/pay-bills.component';
import { FundOptions, IHomePageOptions } from 'src/app/models/app-pages-model';
import { buyAirtimeModalID, fundCardAlertID, payBillsModalID } from 'src/app/models/component-id';

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

  public options: IHomePageOptions[] = [
    {
      title: 'Fund Account',
      icon: 'wallet',
      backGround: 'success',
      handler: async () => {
        const alert = await this.alertCtrl.create({
          header: 'Add Fund',
          id: fundCardAlertID,
          keyboardClose: true,
          inputs: [
            {
              type: 'radio',
              label: 'Via USSD',
              value: FundOptions.ViaUSSD,
            },
            {
              type: 'radio',
              label: 'Via Credit Card',
              value: FundOptions.ViaCreditCard,
              cssClass: 'alert-radio'
            },
            {
              type: 'radio',
              label: 'Via Bitcoin',
              value: FundOptions.ViaBitcoin,
              cssClass: 'alert-radio'
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
                if(e == FundOptions.ViaUSSD) {
                  // this.showModalAsync(UssdTranferComponent, ussdTransferModalID);
                }
                else if(e == FundOptions.ViaCreditCard){
                  // this.showModalAsync(CreditCardTranferComponent, creditCardTransferModalID);
                }
                else if(e == FundOptions.ViaBitcoin){
                  // this.showModalAsync(BitcoinTransferComponent, bitcoinTransferModalID);
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
      handler: () => {
        
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

}
