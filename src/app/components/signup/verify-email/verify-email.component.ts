import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from "@capacitor/core";

import { InputValidation } from 'src/app/pages/user-auth/validation';
import { emptyFieldErrorText, internetConnectionError } from 'src/app/models/input-models';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { IUserData } from 'src/app/models/api-response-models';
import { ToastController, AlertController } from '@ionic/angular';
import { signInRoute } from 'src/app/models/route-models';

const { Storage } = Plugins;

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {

  
  public RandomToken: string = '';
  public CountDownTimer: string = '';
  public ResendValid: boolean = false;

  public EmailCodeModel: string = '';
  public EmailCodeErrorText: string = '';
  public EmailCodeLabelText: string = 'Enter Code';

  public InfoText: string = 'An eight-digit token will be sent to your email address. We will notify you when it has been sent';

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
    if(this.Validation.HasExactly(this.EmailCodeModel, 8)) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  inputBlur() {
    const emailCode = this.EmailCodeModel;

    if(this.Validation.IsNullOrEmpty(emailCode)) {
      this.EmailCodeErrorText = emptyFieldErrorText;
    }
    else {
      this.EmailCodeErrorText = '';
    }
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

  async verify() {
    if(!this.IsValid || this.IsSending) return;

    if(this.EmailCodeModel != this.RandomToken) {
      this.EmailCodeErrorText = '*Invalid code';
      return;
    }
    else{
      this.IsSending = true;

      const { value } = await Storage.get({ key: 'userdata' });
      const userData = JSON.parse(value) as IUserData[];
      const userID = userData[0].userid;
      const apikey = userData[0].apikey;
      this.userAuth.confirmEmail(userID, apikey)
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


  resend() {
    this.ResendValid = false;
    this.countDown();

    this.generateCode();
    this.sendCode();
  }

  generateCode() {
    let code: string = '';
    let codeArray: string[] = [];
    for (let i = 0; i < 8; i++) {
      let randomNum = Math.floor(Math.random() * 10);
      codeArray.push(randomNum.toString());
    }

    code = codeArray.join('');
    this.RandomToken = code;
  }

  async sendCode() {
    const { value } = await Storage.get({ key: 'userdata' });
    const userData = JSON.parse(value) as IUserData[];
    const email = userData[0].email;
    this.userAuth.sendEmailToken(email, this.RandomToken)
      .subscribe((res) => {
        if(res.statuscode == 99) {
          this.InfoText = 'A verification code has been sent to your email';
          this.countDown();
        }
      },
      (err) => {
        this.checkInternetConnAlert();
      })
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
    this.EmailCodeModel = '';
    this.EmailCodeErrorText = '';
  }

  countDown() {
    let counter = 60;
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
