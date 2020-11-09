import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Plugins } from "@capacitor/core";

import { IListDetailsOptions } from 'src/app/models/app-pages-model';
import { addFundTransferModalID } from 'src/app/models/component-id';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-add-fund-transfer',
  templateUrl: './add-fund-transfer.component.html',
  styleUrls: ['./add-fund-transfer.component.scss'],
})
export class AddFundTransferComponent implements OnInit {

  public PageTitle: string = 'Fund Via Transfer';

  public InfoText: string = 'You can add money to your account by transfering money to the account below';

  public AccountNumber: string = '0284289323';
  public AccountName: string = 'Beacon Life Inc.';
  public AccountBank: string = 'First Bank Plc.';

  public AccountDetails: IListDetailsOptions[] = [
    {
      title: 'Account Number',
      icon: 'pencil',
      subtitle: this.AccountNumber,
      showSecondaryIcon: true,
      secondaryIcon: 'copy',
    },
    {
      title: 'Account Name',
      icon: 'person',
      subtitle: this.AccountName,
    },
    {
      title: 'Account Bank',
      icon: 'business',
      subtitle: this.AccountBank,
    },
  ]

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', addFundTransferModalID);
  }

  async copyAccNumber() {
    Clipboard.write({
      string: this.AccountNumber
    });

    const toast = await this.toastCtrl.create({
      message: 'Account Number copied',
      duration: 1000,
    });
  }

}
