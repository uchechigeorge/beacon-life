import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { forgotPasswordModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, invalidEmailErrorText } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  public PageTitle: string = 'Forgot Password';

  public EmailModel: string = '';
  public EmailErrorText: string = '';
  public EmailLabelText: string = 'Recover Email';

  public InfoText: string = 'Recovery password will be sent to the email address provided';

  public IsValid: boolean = false;
  public IsSending: boolean = false;
  public ShowSubBtn: boolean = false;

  public Validation: InputValidation = new InputValidation();
  public ForgotPassBtnText: string = 'Reset';
  public ForgotPassSubBtnText: string = "Didn't get email? Resend";

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', forgotPasswordModalID);
  }

  inputChange() {
    if(this.Validation.IsValidEmail(this.EmailModel)) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  inputBlur() {
    const email = this.EmailModel;

    if(this.Validation.IsNullOrEmpty(email)) {
      this.EmailErrorText = emptyFieldErrorText;
    }
    else if(!this.Validation.IsValidEmail(email)){
      this.EmailErrorText = invalidEmailErrorText;
    }
    else {
      this.EmailErrorText = '';
    }
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

  async sendAsync() {
    if(!this.IsValid) return;

    this.IsSending = true;
    this.wait(3000)
      .then(() => {
        this.IsSending = false;
        this.ShowSubBtn = true;
      })
    
  }

}
