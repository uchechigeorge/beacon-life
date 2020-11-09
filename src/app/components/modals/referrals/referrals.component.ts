import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import { referralDetailsModalID, referralsModalID } from 'src/app/models/component-id';
import { ReferralDetailsComponent } from '../referral-details/referral-details.component';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss'],
})
export class ReferralsComponent implements OnInit {

  public PageTitle: string = 'Referrals';

  public ReferralCode: string = 'emmasol019';
  public ReferralCodeLabel: string = 'Referral Code';
  public AmountEarned: number = 200.00;
  public AmountEarnedLabel: string = 'Amount Earned';

  public ReferralDetailsBtnText: string = 'See Referral Details';
  public RequestEarningBtnText: string = 'Request for My Earnings';

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) { }


  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', referralsModalID);
  }

  async requestEarnings() {
    const alert = await this.alertCtrl.create({
      message: 'We are working on it',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }
      ]
    });

    return await alert.present();
  }

  async showDetails() {
    const modal = await this.modalCtrl.create({
      component: ReferralDetailsComponent,
      id: referralDetailsModalID,
    });

    return await modal.present();
  }

  async copyReferralCode() {
    Clipboard.write({
      string: this.ReferralCode
    });

    const toast = await this.toastCtrl.create({
      message: 'Referral Code copied',
      duration: 1000,
    });

    return await toast.present();
  }

}