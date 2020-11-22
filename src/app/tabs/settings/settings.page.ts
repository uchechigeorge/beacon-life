import { Component, OnInit } from '@angular/core';
import { ComponentRef } from '@ionic/core'
import { ModalController, isPlatform, AlertController } from '@ionic/angular';
import { Plugins, StatusBarStyle } from "@capacitor/core";

import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';
import { IListDetailsOptions } from 'src/app/models/app-pages-model';
import { accountStatementModalID, editProfileModalID, resetPasswordModalID, resetPinModalID, verifyAccountModalID } from 'src/app/models/component-id';
import { ResetPasswordComponent } from 'src/app/components/modals/reset-password/reset-password.component';
import { ResetPinComponent } from 'src/app/components/modals/reset-pin/reset-pin.component';
import { AccountStatementComponent } from 'src/app/components/modals/account-statement/account-statement.component';
import { VerifyAccountComponent } from 'src/app/components/modals/verify-account/verify-account.component';

const { Storage, StatusBar } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public PushNotificationEnabled: boolean = false;

  public SettingsOptions: IListDetailsOptions[] = [
    // Theme
    {
      title: 'Theme',
      id: ListItemID.Theme,
      subtitle: 'Light',
      hasHeader: true,
      header: 'Preferences',
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
    // Notifications
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
    // Edit Profile
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
    // Verify Account
    {
      title: 'Verify Account',
      subtitle: 'Verify your account with us',
      button: true,
      icon: isPlatform('ios') ? 'finger-print-outline' : 'finger-print-sharp',
      handler: () => {
        this.showModalAsync(VerifyAccountComponent, verifyAccountModalID);
      }
    },
    // Reset Password
    {
      title: 'Reset Password',
      subtitle: 'Secure your account',
      button: true,
      icon: isPlatform('ios') ? 'key-outline' : 'key-sharp',
      handler: () => {
        this.showModalAsync(ResetPasswordComponent, resetPasswordModalID);
      }
    },
    // Reset Pin
    {
      title: 'Reset Pin',
      subtitle: 'Secure your card',
      icon: isPlatform('ios') ? 'keypad-outline' : 'keypad-sharp',
      button: true,
      handler: () => {
        this.showModalAsync(ResetPinComponent, resetPinModalID);
      }
    },
    // Account statement
    {
      title: 'Account Statement',
      subtitle: 'Review account state and transactions',
      icon: isPlatform('ios') ? 'receipt-outline' : 'receipt-sharp',
      button: true,
      handler: () => {
        this.showModalAsync(AccountStatementComponent, accountStatementModalID);
      }
    },
    // Help
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

  async ngOnInit() {
    const { value } = await Storage.get({ key: 'theme' });
    this.Theme = value as IThemeType;
    this.changeTheme(this.Theme);
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

    Storage.set({
      key: 'theme',
      value: this.Theme
    });
    this.toggleTheme();
  }


  toggleTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if(this.Theme == 'light') {
      this.setLight();
    }
    else if(this.Theme == 'dark') {
      this.setDark();
    }
    else if(this.Theme == 'system-preference') {
      if(prefersDark.matches) {
        this.setDark();
      }
      else {
        this.setLight();
      }
    }
  }


  setLight() {
    document.body.classList.remove('dark');
    if(!isPlatform('capacitor')) return;
    StatusBar.setBackgroundColor({
      color: '#ffffff',
    });
    StatusBar.setStyle({
      style: StatusBarStyle.Light,
    });
  }

  setDark() {
    document.querySelector('body').classList.add('dark');
    if(!isPlatform('capacitor')) return;
    StatusBar.setBackgroundColor({
      color: '#323233',
    });
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });
  }
}

type IThemeType = 'light' | 'dark' | 'system-preference';

enum ListItemID{
  Theme,
  Notifications
}