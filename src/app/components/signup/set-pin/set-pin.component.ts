import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Plugins } from "@capacitor/core";

import { IInputType } from 'src/app/models/app-pages-model';
import { confirmPinMismatch, emptyFieldErrorText, fixedPasswordLengthError, internetConnectionError } from 'src/app/models/input-models';
import { signInRoute } from 'src/app/models/route-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { IUserData } from 'src/app/models/api-response-models';

const { Storage } = Plugins;

@Component({
  selector: 'app-set-pin',
  templateUrl: './set-pin.component.html',
  styleUrls: ['./set-pin.component.scss'],
})
export class SetPinComponent implements OnInit {

  public PageTitle: string = 'Set Pin';

  public PinModel: string = '';
  public ConfirmPinModel: string = '';

  public Validation: InputValidation = new InputValidation();

  public IsProcessing: boolean = false;
  public IsValid: boolean = false;

  public SetPinText: string = 'Set Pin';

  @Output('complete') completedEvent: EventEmitter<any> = new EventEmitter();

  public Inputs: IInputType[] = [
    // Pin
    {
      id: InputID.Pin,
      model: this.PinModel,
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
        let password = this.getResetInputs(InputID.Pin).model;

        if(this.Validation.IsNullOrEmpty(password)) {
          this.setResetErrorText(InputID.Pin, emptyFieldErrorText);
        }
        else if(!this.Validation.HasExactly(password, 4)) {
          this.setResetErrorText(InputID.Pin, fixedPasswordLengthError(4));
        }
        else {
          this.setResetErrorText(InputID.Pin);
        }
      },
      modelChanged: () => {
        this.PinModel = this.getResetInputs(InputID.Pin).model;
        this.inputsResetChange();
      },
      togglePasswordVisibility: () => {
        this.togglePin(InputID.Pin, true);
      }
    },
    // Confirm Pin
    {
      id: InputID.ConfirmPin,
      model: this.ConfirmPinModel,
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
        const pin = this.getResetInputs(InputID.Pin).model;
        const confirmPin = this.getResetInputs(InputID.ConfirmPin).model;

        if(!this.Validation.ConfirmPasswordMatch(pin, confirmPin)) {
          this.setResetErrorText(InputID.ConfirmPin, confirmPinMismatch);
        }
        else {
          this.setResetErrorText(InputID.ConfirmPin);
        }
      },
      modelChanged: () => {
        this.ConfirmPinModel = this.getResetInputs(InputID.ConfirmPin).model;
        this.inputsResetChange();
      },
      togglePasswordVisibility: () => {
        this.togglePin(InputID.ConfirmPin, true);
      }
    },
  ]

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private toastCtrl: ToastController,
    private userAuth: UserAuthService,
  ) {}

  ngOnInit() {}


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

    let input: IInputType = this.Inputs.find( input => input.id == id )

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
    if(this.Validation.HasExactly(this.PinModel, 4) && this.Validation.ConfirmPasswordMatch(this.PinModel, this.ConfirmPinModel)) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  async confirm() {
    if(!this.IsValid || this.IsProcessing) return;

    this.IsProcessing = true;

    const { value } = await Storage.get({ key: 'userdata' });
    const data = JSON.parse(value) as IUserData[];
    let userdata = data[0];

    const userID = userdata.userid;
    const apiKey = userdata.apikey;

    this.userAuth.setPin(userID, this.PinModel, apiKey)
    .subscribe((res) => {
      if(res.statuscode == 99) {
        this.proceed(res.userdata);
      }
      else if(res.statuscode == 96){
        this.incorrectApiKey();
      }

      this.IsProcessing = false;
    },
    (err) => {
      console.log(err);
      this.checkInternetConnAlert();
      this.IsProcessing = false;
    });
  }

  async proceed(data: IUserData[]) {
    console.log(data);
    await Storage.set({
      key: 'userdata',
      value: JSON.stringify(data)
    });
    this.reset();
    this.IsValid = false;
    if(this.completedEvent)
      this.completedEvent.emit();
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

  reset() {
    this.Inputs.forEach(input => {
      input.model = '';
    })
  }

  async checkInternetConnAlert() {
    const toast = await this.toastCtrl.create({
      message: internetConnectionError,
      duration: 3000,
      position: 'top',
    });

    return await toast.present();
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
  forgotPin() {

  }
}

enum InputID{
  Pin,
  ConfirmPin
}