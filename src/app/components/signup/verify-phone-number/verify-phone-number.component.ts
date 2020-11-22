import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plugins } from "@capacitor/core";

import { emptyFieldErrorText, internetConnectionError } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { signInRoute } from 'src/app/models/route-models';
import { IUserData } from 'src/app/models/api-response-models';

const { Storage } = Plugins;

@Component({
  selector: 'app-verify-phone-number',
  templateUrl: './verify-phone-number.component.html',
  styleUrls: ['./verify-phone-number.component.scss'],
})
export class VerifyPhoneNumberComponent implements OnInit {

  public RandomToken: string = '';
  public CountDownTimer: string = '';
  public ResendValid: boolean = false;

  public PhoneNumberCodeModel: string = '';
  public PhoneNumberCodeErrorText: string = '';
  public PhoneNumberCodeLabelText: string = 'Enter Code';

  public InfoText: string = 'A six-digit token will be sent to your phone number. We will notify you when it is sent';

  public IsValid: boolean = false;
  public IsSending: boolean = false;

  public Validation: InputValidation = new InputValidation();
  public VerifyBtnTxt: string = 'Verify';
  public ResendCodeBtnText: string = "Didn't get code? Resend";
  
  @Output('complete') completedEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private userAuth: UserAuthService,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.generateCode();
    this.sendCode();
  }

  inputChange() {
    if(this.Validation.HasExactly(this.PhoneNumberCodeModel, 6)) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  inputBlur() {
    const phoneCode = this.PhoneNumberCodeModel;

    if(this.Validation.IsNullOrEmpty(phoneCode)) {
      this.PhoneNumberCodeErrorText = emptyFieldErrorText;
    }
    else {
      this.PhoneNumberCodeErrorText = '';
    }
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

  async verify() {
    if(!this.IsValid || this.IsSending) return;

    if(this.PhoneNumberCodeModel != this.RandomToken) {
      this.PhoneNumberCodeErrorText = '*Invalid token';
      return;
    }
    else{
      this.IsSending = true;

      const { value } = await Storage.get({ key: 'userdata' });
      const userData = JSON.parse(value) as IUserData[];
      const userID = userData[0].userid;
      const apikey = userData[0].apikey;
      this.userAuth.confirmPhoneNo(userID, apikey)
        .subscribe((res) => {
          if(res.statuscode == 99) {
            this.proceed(res.userdata);
          }
          else if(res.statuscode == 96) {
            this.incorrectApiKey();
          }

          this.IsSending = false;
        })
    }

  }

  async proceed(data: IUserData[]) {
    console.log(data);
    await Storage.set({
      key: 'userdata',
      value: JSON.stringify(data)
    });
    this.reset();
    if(this.completedEvent)
      this.completedEvent.emit();
  }

  async sendCode() {
    const { value } = await Storage.get({ key: 'userdata' });
    const userData = JSON.parse(value) as IUserData[];
    const phoneNum = userData[0].phonenum;
    this.userAuth.sendPhoneNumToken(phoneNum, this.RandomToken)
      .subscribe((res) => {
        this.InfoText = 'A verification code has been sent to your phone number. Please be patient, this might take several minutes';
        this.countDown();
      },
      (err) => {
        this.checkInternetConnAlert();
      })
  }

  resend() {
    this.ResendValid = false;
    this.countDown();

    this.generateCode();
    this.sendCode();
  }

  generateCode() {
    let code: string = '';
    let codeArray: string[] = [];
    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * 10);
      codeArray.push(randomNum.toString());
    }

    code = codeArray.join('');
    this.RandomToken = code;
  }

  async incorrectApiKey() {
    const alert = await this.alertCtrl.create({
      message: 'Sorry, there was an error while uploading details. Try logging in again.',
      header: 'Error',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Continue',
          handler: () => {
            this.reset();
            this.router.navigate([`${ signInRoute }`]);
          }
        }
      ]
    });

    return await alert.present();
  }

  
  async checkInternetConnAlert() {
    const toast = await this.toastCtrl.create({
      message: internetConnectionError,
      duration: 3000,
      position: 'top',
    });

    return await toast.present();
  }

  reset() {
    this.PhoneNumberCodeModel = '';
    this.PhoneNumberCodeErrorText = '';
  }

  countDown() {
    let counter = 300;
    var id = setInterval(() => {
      if(counter == 1) {
        clearInterval(id);
        this.CountDownTimer = '';
        this.ResendValid = true;
      }
      counter--;
      this.CountDownTimer = counter.toString();
    }, 1000);
  }

}
