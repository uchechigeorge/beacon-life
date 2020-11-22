import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { resetPasswordModalID } from 'src/app/models/component-id';
import { confirmPasswordMismatch, emptyFieldErrorText, weakPasswordLength } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  public PageTitle: string = 'Reset Password';

  public ResetPasswordModel: string = '';
  public ResetConfirmPasswordModel: string = '';
  public VerifyPasswordModel: string = '';

  public Validation: InputValidation = new InputValidation();

  public IsVerified: boolean = false;
  public IsVerifying: boolean = false;
  public IsConfirming: boolean = false;

  public VerifyValid: boolean = false;
  public ConfirmValid: boolean = false;

  public VerifyBtnText: string = 'Verify';
  public VerifySubBtnText: string = 'Forgot Password';
  public ConfirmBtnText: string = 'Reset';

  public ResetInputs: IInputType[] = [
    // New Paasword
    {
      id: InputID.ResetPassword,
      model: '',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      isPassword: true,
      type: 'password',
      passwordVisible: false,
      label: 'New password',
      passwordIcon: 'eye',
      inputBlur: () => {
        let password = this.getResetInputs(InputID.ResetPassword).model;

        if(this.Validation.IsNullOrEmpty(password)) {
          this.setResetErrortext(InputID.ResetPassword, emptyFieldErrorText);
        }
        else if(!this.Validation.IsValidPassword(password, 5, 50)) {
          this.setResetErrortext(InputID.ResetPassword, weakPasswordLength(5, 50));
        }
        else {
          this.setResetErrortext(InputID.ResetPassword);
        }
      },
      modelChanged: () => {
        this.ResetPasswordModel = this.getResetInputs(InputID.ResetPassword).model;
        this.inputResetChange();
      },
      togglePasswordVisibility: () => {
        this.togglePassword(InputID.ResetPassword, true);
      }
    },
    // Confirm New Password
    {
      id: InputID.ResetConfirmPassword,
      model: this.ResetConfirmPasswordModel,
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      isPassword: true,
      type: 'password',
      passwordVisible: false,
      label: 'Confirm New password',
      passwordIcon: 'eye',
      inputBlur: () => {
        const password = this.getResetInputs(InputID.ResetPassword).model;
        const confirmPassword = this.getResetInputs(InputID.ResetConfirmPassword).model;

        if(!this.Validation.ConfirmPasswordMatch(password, confirmPassword)) {
          this.setResetErrortext(InputID.ResetConfirmPassword, confirmPasswordMismatch);
        }
        else {
          this.setResetErrortext(InputID.ResetConfirmPassword);
        }
      },
      modelChanged: () => {
        this.ResetConfirmPasswordModel = this.getResetInputs(InputID.ResetConfirmPassword).model;
        this.inputResetChange();
      },
      togglePasswordVisibility: () => {
        this.togglePassword(InputID.ResetConfirmPassword, true);
      }
    },
  ]

  // Verify Password
  public VerifyPasswordInput: IInputType = {
    id: InputID.VerifyPassword,
    model: this.VerifyPasswordModel,
    detail: {
      detailText: '',
      detailTextColor: 'danger'
    },
    isPassword: true,
    label: 'Verify Password',
    type: 'password',
    passwordIcon: 'eye',
    passwordVisible: false,
    modelChanged: () => {
      this.VerifyPasswordModel = this.getVerifyInput().model;

      if(!this.Validation.IsNullOrEmpty(this.VerifyPasswordModel)) 
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
      this.togglePassword(InputID.VerifyPassword, false);
    },
  }

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', resetPasswordModalID);
  }

  getResetInputs(id: InputID) {
    const input = this.ResetInputs.find(input => {
      return input.id == id;
    });

    return input;
  }

  getVerifyInput() {
    return this.VerifyPasswordInput;
  }

  setResetErrortext(id: InputID, message?: string) {
    if(!message) message = '';

    const input = this.ResetInputs.find(input => {
      return input.id == id;
    });

    input.detail.detailText = message;
  }

  setVerifyErrorText(message?: string) {
    if(!message) message = '';
    this.VerifyPasswordInput.detail.detailText = message;
  }

  inputResetChange() {
    if(this.Validation.IsValidPassword(this.ResetPasswordModel, 5, 50) && this.Validation.ConfirmPasswordMatch(this.ResetPasswordModel, this.ResetConfirmPasswordModel)) {
      this.ConfirmValid = true;
    }
    else {
      this.ConfirmValid = false;
    }
  }

  verify() {
    if(!this.VerifyValid || this.IsVerifying) return;

    this.IsVerifying = true;
    
    this.wait(3000)
      .then(() => {
        this.IsVerified = true;
        this.IsVerifying = false;
      });
  }

  confirm() {
    if(!this.ConfirmValid || this.IsConfirming) return;

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

  togglePassword(id: InputID, reset?: boolean, setVisibility?: boolean) {
    if(reset == undefined) reset = true;

    let input: IInputType;
    if(reset == true){
     input = this.ResetInputs.find(input => {
        return input.id == id;
      });
    }
    else {
      input = this.VerifyPasswordInput;
    }

    if(setVisibility != null) {
      input.passwordVisible = setVisibility;
      return;
    }

    if(input.passwordVisible == true) {
      input.type = 'password';
      input.passwordIcon = 'eye';
      input.passwordVisible = false;
    }
    else{
      input.type = 'text';
      input.passwordIcon = 'eye-off';
      input.passwordVisible = true;
    }
  }

  wait = (ms) => new Promise<any>(resolve => setTimeout(resolve, ms));

  forgotPassword() {
    
  }

}

enum InputID{
  ResetPassword,
  ResetConfirmPassword,
  VerifyPassword,
}