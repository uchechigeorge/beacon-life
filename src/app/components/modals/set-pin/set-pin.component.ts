import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { setPinModalID } from 'src/app/models/component-id';
import { confirmPinMismatch, emptyFieldErrorText, fixedPasswordLengthError } from 'src/app/models/input-models';
import { homeRoute } from 'src/app/models/route-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-set-pin',
  templateUrl: './set-pin.component.html',
  styleUrls: ['./set-pin.component.scss'],
})
export class SetPinComponent implements OnInit {

  public PageTitle: string = 'Set Pin';

  public ResetPinModel: string = '';
  public ResetConfirmPinModel: string = '';
  public VerifyPinModel: string = '';

  public Validation: InputValidation = new InputValidation();

  public IsProcessing: boolean = false;
  public IsValid: boolean = false;

  public SetPinText: string = 'Set Pin';

  public Inputs: IInputType[] = [
    // Pin
    {
      id: InputID.ResetPin,
      model: this.ResetPinModel,
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      isPassword: true,
      type: 'number',
      passwordVisible: false,
      label: 'Pin',
      passwordIcon: 'eye',
      inputBlur: () => {
        let password = this.getResetInputs(InputID.ResetPin).model;

        if(this.Validation.IsNullOrEmpty(password)) {
          this.setResetErrorText(InputID.ResetPin, emptyFieldErrorText);
        }
        else if(!this.Validation.HasExactly(password, 4)) {
          this.setResetErrorText(InputID.ResetPin, fixedPasswordLengthError(4));
        }
        else {
          this.setResetErrorText(InputID.ResetPin);
        }
      },
      modelChanged: () => {
        this.ResetPinModel = this.getResetInputs(InputID.ResetPin).model;
        this.inputsResetChange();
      },
      togglePasswordVisibility: () => {
        this.togglePin(InputID.ResetPin, true);
      }
    },
    // Confirm Pin
    {
      id: InputID.ResetConfirmPin,
      model: this.ResetConfirmPinModel,
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      isPassword: true,
      type: 'number',
      passwordVisible: false,
      label: 'Confirm Pin',
      passwordIcon: 'eye',
      inputBlur: () => {
        const pin = this.getResetInputs(InputID.ResetPin).model;
        const confirmPin = this.getResetInputs(InputID.ResetConfirmPin).model;

        if(!this.Validation.ConfirmPasswordMatch(pin, confirmPin)) {
          this.setResetErrorText(InputID.ResetConfirmPin, confirmPinMismatch);
        }
        else {
          this.setResetErrorText(InputID.ResetConfirmPin);
        }
      },
      modelChanged: () => {
        this.ResetConfirmPinModel = this.getResetInputs(InputID.ResetConfirmPin).model;
        this.inputsResetChange();
      },
      togglePasswordVisibility: () => {
        this.togglePin(InputID.ResetConfirmPin, true);
      }
    },
  ]

    constructor(
    private modalCtrl: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', setPinModalID);
  }

  getResetInputs(id: InputID) {
    const input = this.Inputs.find(input => {
      return input.id == id;
    })

    return input;
  }

  setResetErrorText(id: InputID, message?: string) {
    if(!message) message = '';

    let input = this.Inputs.find(input => {
      return input.id == id;
    });

    input.detail.detailText = message;
  }

  togglePin(id: InputID, setVisibility?: boolean) {

    let input: IInputType = this.Inputs.find(input => {
        return input.id == id;
      });

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

  inputsResetChange() {
    if(this.Validation.HasExactly(this.ResetPinModel, 4) && this.Validation.ConfirmPasswordMatch(this.ResetPinModel, this.ResetConfirmPinModel)) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  confirm() {
    if(!this.IsValid) return;

    this.IsProcessing = true;

    this.wait(3000) 
    .then(() => {
      this.proceed();
      this.IsProcessing = false;
    })
  }

  proceed() {
    this.router.navigate([homeRoute])
    this.dismissModal();
  }

  wait = (ms) => new Promise<any>(resolve => setTimeout(resolve, ms));

  forgotPin() {

  }
}

enum InputID{
  ResetPin,
  ResetConfirmPin,
  VerifyPin,
}