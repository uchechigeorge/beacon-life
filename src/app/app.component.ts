import { Component } from '@angular/core';
import { Platform, isPlatform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar as StatusBarNative } from '@ionic-native/status-bar/ngx';
import { Plugins, StatusBarStyle } from "@capacitor/core";

import { CustomRouteService } from './services/custom-route.service';

const { Storage, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public Theme: IThemeType = 'light';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBarNative,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.checkThemeAsync();
  }

  async checkThemeAsync() {
    const { value } = await Storage.get({ key: 'theme' });
    this.Theme = value as IThemeType;
    this.toggleTheme();
  }

  toggleTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if(this.Theme == 'light') {
      this.setLight();
    }
    else if(this.Theme == 'dark') {
      this.setDark();
      console.log('hit')
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
