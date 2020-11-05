import { Component, OnInit } from '@angular/core';
import { ComponentRef } from '@ionic/core'
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';
import { IListDetailsOptions } from 'src/app/models/app-pages-model';
import { accountStatementModalID, editProfileModalID, resetPasswordModalID, resetPinModalID, verifyAccountModalID } from 'src/app/models/component-id';
import { ResetPasswordComponent } from 'src/app/components/modals/reset-password/reset-password.component';
import { ResetPinComponent } from 'src/app/components/modals/reset-pin/reset-pin.component';
import { AccountStatementComponent } from 'src/app/components/modals/account-statement/account-statement.component';
import { VerifyAccountComponent } from 'src/app/components/modals/verify-account/verify-account.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public SettingsOptions: IListDetailsOptions[] = [
    {
      title: 'Edit Profile',
      subtitle: 'Edit your first name, phone number, etc',
      icon: 'person',
      handler: async () => {
        this.showModalAsync(EditProfileComponent, editProfileModalID);
      }
    },
    {
      title: 'Verify Account',
      subtitle: 'Verify your account with us',
      icon: 'finger-print',
      handler: () => {
        this.showModalAsync(VerifyAccountComponent, verifyAccountModalID);
      }
    },
    {
      title: 'Reset Password',
      subtitle: 'Do you think your password is weak? Click me joor',
      icon: 'key',
      handler: () => {
        this.showModalAsync(ResetPasswordComponent, resetPasswordModalID);
      }
    },
    {
      title: 'Reset Pin',
      subtitle: 'Secure your card from Yahoo Boys',
      icon: 'keypad',
      handler: () => {
        this.showModalAsync(ResetPinComponent, resetPinModalID);
      }
    },
    {
      title: 'Account Statement',
      subtitle: 'Review account state and transactions',
      icon: 'receipt',
      handler: () => {
        this.showModalAsync(AccountStatementComponent, accountStatementModalID);
      }
    },
    {
      title: 'Help and Support',
      subtitle: 'Having an issue? Contact us. FAQs',
      icon: 'help',
      handler: () => {
        
      }
    },
  ]

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  async showModalAsync(component: ComponentRef, id?:string) {
    const modal = await this.modalCtrl.create({
      component,
      id
    });

    return await modal.present();
  }

}
