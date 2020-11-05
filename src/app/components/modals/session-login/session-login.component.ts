import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { sessionsLoginModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, fixedPasswordLengthError } from 'src/app/models/input-models';
import { homeRoute, signUpRoute } from 'src/app/models/route-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-session-login',
  templateUrl: './session-login.component.html',
  styleUrls: ['./session-login.component.scss'],
})
export class SessionLoginComponent implements OnInit {

  public PageTitle: string = 'Continue';

  public ContinueText: string = 'Continue as ';
  public SessionsName: string = 'Emmanuel Soligbo';
  public PinModel: string = '';

  public Validation: InputValidation = new InputValidation();

  public VerifyValid: boolean = false;
  public IsVerifying: boolean = false;
  public VerifyBtnText: string = 'Continue';
  public VerifySubBtnText: string = 'This is not me. Logout';



  public PinInput: IInputType = {
    id: '',
    model: this.PinModel,
    label: 'Enter Pin',
    detail: {
      detailText: '',
      detailTextColor: 'danger'
    },
    isPassword: true,
    passwordIcon: 'eye',
    passwordVisible: false,
    type: 'number',
    inputBlur: () => {
      const pin = this.PinInput.model;

      if(this.Validation.IsNullOrEmpty(pin)) {
        this.PinInput.detail.detailText = emptyFieldErrorText;
      }
      // else if(!this.Validation.HasExactly(pin, 4)) {
      //   this.PinInput.detail.detailText =  fixedPasswordLengthError(4);
      // }
      else {
        this.PinInput.detail.detailText = '';
      }
    },
    modelChanged: () => {
      this.PinModel = this.PinInput.model;

      if(!this.Validation.IsNullOrEmpty(this.PinModel)) {
        this.VerifyValid = true;
      }
      else{
        this.VerifyValid = false;
      }
    },
    togglePasswordVisibility: () => {
      this.togglePin();
    }
  }


  constructor(
    private modalCtrl: ModalController,
    private router: Router,
  ) { 
    this.ContinueText += this.SessionsName + '?';
  }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', sessionsLoginModalID);
  }

  togglePin(setVisibility?: boolean) {

    let input = this.PinInput;

    if(setVisibility != null) {
      input.passwordVisible = setVisibility;
      return;
    }

    if(input.passwordVisible == true) {
      input.passwordIcon = 'eye';
      input.passwordVisible = false;
    }
    else{
      input.passwordIcon = 'eye-off';
      input.passwordVisible = true;
    }
  }

  verify() {
    if(!this.VerifyValid) return;

    this.IsVerifying = true;

    this.wait(3000)
      .then(() => {
        this.proceed();
        this.IsVerifying = false;
      })
      .catch(() => {
        this.IsVerifying = false;
      })
  }

  proceed() {
    this.router.navigate([homeRoute]);
    this.dismissModal();
  }

  subTextClick() {
    this.router.navigate([signUpRoute]);
    this.dismissModal();
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));
}
