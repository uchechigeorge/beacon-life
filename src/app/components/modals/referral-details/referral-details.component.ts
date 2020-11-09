import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { referralDetailsModalID, referralsModalID } from 'src/app/models/component-id';

@Component({
  selector: 'app-referral-details',
  templateUrl: './referral-details.component.html',
  styleUrls: ['./referral-details.component.scss'],
})
export class ReferralDetailsComponent implements OnInit {

  public PageTitle: string = 'Referral Details';

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', referralDetailsModalID);
  }

}
