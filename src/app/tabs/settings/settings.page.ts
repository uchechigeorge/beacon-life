import { Component, OnInit } from '@angular/core';
import { ComponentRef } from '@ionic/core'
import { ModalController, isPlatform, AlertController } from '@ionic/angular';

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

  public PushNotificationEnabled: boolean = false;

  public SettingsOptions: IListDetailsOptions[] = [
    {
      title: 'Theme',
      id: ListItemID.Theme,
      subtitle: 'Light',
      hasHeader: true,
      header: 'Preferances',
      icon: isPlatform('ios') ? 'sunny-outline' : 'sunny-sharp',
      button: true,
      handler: async () => {
        const alert = await this.alertCtrl.create({
          header: 'Select Theme',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Ok',
              handler: (e) => {
                if(e == undefined) return false;
                this.changeTheme(e);
              }
            },
          ],
          inputs: [
            {
              type: 'radio',
              label: 'System Preferrence',
              value: 'system-preference' as IThemeType,
              checked: this.Theme == 'system-preference',
            },
            {
              type: 'radio',
              label: 'Light',
              value: 'light' as IThemeType,
              checked: this.Theme == 'light',
            },
            {
              type: 'radio',
              label: 'Dark',
              value: 'dark' as IThemeType,
              checked: this.Theme == 'dark',
            },
          ]
        });

        return await alert.present();
      }
    },
    {
      title: 'Push Notifications',
      id: ListItemID.Notifications,
      subtitle: 'Off',
      icon: isPlatform('ios') ? this.PushNotificationEnabled ? 'notifications-outline' : 
        'notifications-off-outline' : this.PushNotificationEnabled ? 'notifications-sharp' : 'notifications-off-sharp',
      button: false,
      toggle: true,
      handler: (e?) => {
        if(e !== 'toggle') return;
        const listItem = this.getListItem(ListItemID.Notifications);

        if(this.PushNotificationEnabled) {
          listItem.icon = isPlatform('ios') ? 'notifications-outline' : 'notifications-sharp';
          listItem.subtitle = 'On';
        }
        else {
          listItem.icon = isPlatform('ios') ? 'notifications-off-outline' : 'notifications-off-sharp';
          listItem.subtitle = 'Off';
        }
      },
    },
    {
      title: 'Edit Profile',
      subtitle: 'Edit your first name, phone number, etc',
      icon: isPlatform('ios') ? 'person-outline' : 'person-sharp',
      hasHeader: true,
      button: true,
      header: 'Account Settings',      
      handler: async () => {
        this.showModalAsync(EditProfileComponent, editProfileModalID);
      }
    },
    {
      title: 'Verify Account',
      subtitle: 'Verify your account with us',
      button: true,
      icon: isPlatform('ios') ? 'finger-print-outline' : 'finger-print-sharp',
      handler: () => {
        this.showModalAsync(VerifyAccountComponent, verifyAccountModalID);
      }
    },
    {
      title: 'Reset Password',
      subtitle: 'Do you think your password is weak? Click me joor',
      button: true,
      icon: isPlatform('ios') ? 'key-outline' : 'key-sharp',
      handler: () => {
        this.showModalAsync(ResetPasswordComponent, resetPasswordModalID);
      }
    },
    {
      title: 'Reset Pin',
      subtitle: 'Secure your card from Yahoo Boys',
      icon: isPlatform('ios') ? 'keypad-outline' : 'keypad-sharp',
      button: true,
      handler: () => {
        this.showModalAsync(ResetPinComponent, resetPinModalID);
      }
    },
    {
      title: 'Account Statement',
      subtitle: 'Review account state and transactions',
      icon: isPlatform('ios') ? 'receipt-outline' : 'receipt-sharp',
      button: true,
      handler: () => {
        this.showModalAsync(AccountStatementComponent, accountStatementModalID);
      }
    },
    {
      title: 'Help and Support',
      subtitle: 'Having an issue? Contact us. FAQs',
      button: true,
      icon: isPlatform('ios') ? 'help-outline' : 'help-sharp',
      handler: () => {
        
      }
    },
  ]

  public Theme: IThemeType = 'light';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
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

  getListItem(id: ListItemID) {
    const listItem = this.SettingsOptions.find(item => item.id == id);
    return listItem;
  }

  changeTheme(value?: IThemeType) {
    let listItem = this.getListItem(ListItemID.Theme);
    switch (value) {
      case 'system-preference':
        listItem.subtitle = 'System Preference';
        listItem.icon = isPlatform('ios') ? 'desktop-outline' : 'desktop-sharp';
        this.Theme = 'system-preference';
        break;
      case 'light':
        listItem.subtitle = 'Light';
        listItem.icon = isPlatform('ios') ? 'sunny-outline' : 'sunny-sharp';
        this.Theme = 'light';
        break;
      case 'dark':
        listItem.subtitle = 'Dark';
        listItem.icon = isPlatform('ios') ? 'moon-outline' : 'moon-sharp';
        this.Theme = 'dark';
        break;
      default:
        break;
    }
  }
}

type IThemeType = 'light' | 'dark' | 'system-preference';

enum ListItemID{
  Theme,
  Notifications
}