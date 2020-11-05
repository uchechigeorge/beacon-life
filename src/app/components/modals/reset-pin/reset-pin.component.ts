import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { resetPinModalID } from 'src/app/models/component-id';
import { confirmPinMismatch, emptyFieldErrorText, fixedPasswordLengthError, weakPasswordLength } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.component.html',
  styleUrls: ['./reset-pin.component.scss'],
})
export class ResetPinComponent implements OnInit {

  public PageTitle: string = 'Reset Pin';

  public ResetPinModel: string = '';
  public ResetConfirmPinModel: string = '';
  public VerifyPinModel: string = '';

  public Validation: InputValidation = new InputValidation();

  public IsVerified: boolean = false;
  public IsVerifying: boolean = false;
  public IsConfirming: boolean = false;

  public VerifyValid: boolean = false;
  public ConfirmValid: boolean = false;

  public VerifyBtnText: string = 'Verify';
  public VerifySubBtnText: string = 'Forgot Pin';
  public ConfirmBtnText: string = 'Reset';

  public ResetInputs: IInputType[] = [
    // New Pin
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
      label: 'New Pin',
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
    // Confirm New Pin
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
      label: 'Confirm New Pin',
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

  // Verify Password
  public VerifyPinInput: IInputType = {
    id: InputID.VerifyPin,
    model: this.VerifyPinModel,
    detail: {
      detailText: '',
      detailTextColor: 'danger'
    },
    isPassword: true,
    label: 'Verify Pin',
    type: 'number',
    passwordIcon: 'eye',
    passwordVisible: false,
    modelChanged: () => {
      this.VerifyPinModel = this.getVerifyInput().model;

      if(!this.Validation.IsNullOrEmpty(this.VerifyPinModel)) 
        this.VerifyValid = true;
      else 
      this.VerifyValid = false;
    },
    inputBlur: () => {
      let password = this.getVerifyInput().model;

      if(this.Validation.IsNullOrEmpty(password)){
        this.setVerifyErrorText(emptyFieldErrorText);
      }
      else {
        this.setVerifyErrorText();
      }
    },
    togglePasswordVisibility: () => {
      this.togglePin(InputID.VerifyPin, false);
    },
  }

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', resetPinModalID);
  }

  getResetInputs(id: InputID) {
    const input = this.ResetInputs.find(input => {
      return input.id == id;
    })

    return input;
  }

  getVerifyInput() {
    return this.VerifyPinInput;
  }

  setResetErrorText(id: InputID, message?: string) {
    if(!message) message = '';

    let input = this.ResetInputs.find(input => {
      return input.id == id;
    });

    input.detail.detailText = message;
  }

  setVerifyErrorText(message?: string) {
    if(!message) message = '';

    this.VerifyPinInput.detail.detailText = message;
  }

  togglePin(id: InputID, isReset?: boolean, setVisibility?: boolean) {
    if(isReset == undefined) isReset = true;

    let input: IInputType;
    if(isReset == true){
     input = this.ResetInputs.find(input => {
        return input.id == id;
      });
    }
    else {
      input = this.VerifyPinInput;
    }

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
      this.ConfirmValid = true;
    }
    else {
      this.ConfirmValid = false;
    }
  }

  verify() {
    if(!this.VerifyValid) return;

    this.IsVerifying = true;
    
    this.wait(3000)
      .then(() => {
        this.IsVerified = true;
        this.IsVerifying = false;
      });
  }

  confirm() {
    if(!this.ConfirmValid) return;

    this.IsConfirming = true;

    this.wait(3000) 
    .then(() => {
      this.proceed();
      this.IsConfirming = false;
    })
  }

  proceed() {
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