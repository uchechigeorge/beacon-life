import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Plugins } from "@capacitor/core";

import { cardsRoute, homeRoute, PageType, settingsRoute, transactionsRoute, SignUpProgress } from '../models/route-models';
import { Subject } from 'rxjs';
import { IUserData } from '../models/api-response-models';
import { InputValidation } from '../pages/user-auth/validation';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CustomRouteService {

  public ProgressType: SignUpProgress;
  private ProgressSubject = new Subject<SignUpProgress>();

  private Validation: InputValidation = new InputValidation();

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((val: NavigationEnd) => {
      if(!(val instanceof NavigationEnd)) return;

      this.PageType = this.convertStringToPageType(val.url);
    });

    this.check().then(() => {
      this.getProgress();
    });
  }

  public PageType: PageType;

  convertStringToPageType(route: string): PageType {
    route = route.replace('/', '');
    switch(route) {
      case '':
        return PageType.Home;
      case homeRoute:
        return PageType.Home;
      case cardsRoute:
        return PageType.Cards;
      case transactionsRoute:
        return PageType.Transactions;
      case settingsRoute:
        return PageType.Settings;
      default:
        return PageType.Home;
    }
  }


  async setProgress(progress?: SignUpProgress) {
    if(progress == undefined) return;
    this.ProgressType = progress;
    await Storage.set({
      key: 'signup-progress',
      value: JSON.stringify(this.ProgressType)
    })
  }

  async getProgress() {
    let { value } = await Storage.get({ key: 'signup-progress' });
    if(isNaN(parseInt(value))) value = '0';
    this.ProgressType = parseInt(value) as SignUpProgress;
  }

  async check() {
    const { value } = await Storage.get({ key: 'userdata' });
    const userDataArray = JSON.parse(value) as IUserData[];
    if(userDataArray == null) {
      this.ProgressType = SignUpProgress.None;
      this.setProgress(SignUpProgress.None);
      return;
    }
    const userData = userDataArray[0];
    console.log(userData.fname);

    if(this.Validation.IsNullOrEmpty(userData.fname, userData.lname, userData.phonenum, userData.address, userData.state, userData.country)) {
      this.ProgressType = SignUpProgress.SetProfile;
      await this.setProgress(SignUpProgress.SetProfile);
      console.log('hit');
    }
    else if(this.Validation.IsNullOrEmpty(userData.pin)) {
      this.ProgressType = SignUpProgress.SetPin;
      await this.setProgress(SignUpProgress.SetPin);
    }
    else if(this.Validation.IsNullOrEmpty(userData.dpurl)) {
      this.ProgressType = SignUpProgress.UploadPicture;
      await this.setProgress(SignUpProgress.UploadPicture);
    }
    else if(userData.verifyemail == '0'){
      this.ProgressType = SignUpProgress.VerifyEmail;
      await this.setProgress(SignUpProgress.VerifyEmail);
    }
    else if(userData.verifyphone == '0') {
      this.ProgressType = SignUpProgress.VerifyPhoneNumber;
      await this.setProgress(SignUpProgress.VerifyPhoneNumber);
    }
    else {
      this.setProgress(SignUpProgress.Complete);
    }

    console.log(this.ProgressType);

  }

  sendProgressEvent(progress?: SignUpProgress) {
    if(!progress) progress = this.ProgressType;

    this.ProgressSubject.next(progress);
  }

  getProgressEvent() {
    return this.ProgressSubject.asObservable();
  }

  setAllActive()  {
    this.ProgressType = SignUpProgress.All;
  }
}