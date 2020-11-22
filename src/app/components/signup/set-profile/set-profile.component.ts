import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from "@capacitor/core";

import { IInputType } from 'src/app/models/app-pages-model';
import { InputValidation } from 'src/app/pages/user-auth/validation';
import { emptyFieldErrorText, duplicateCredential, internetConnectionError } from 'src/app/models/input-models';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { IUserData } from 'src/app/models/api-response-models';
import { ToastController, AlertController } from '@ionic/angular';
import { signInRoute } from 'src/app/models/route-models';

const { Storage } = Plugins;

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.scss'],
})
export class SetProfileComponent implements OnInit {

  public FirstNameModel: string = '';
  public LastNameModel: string = '';
  public PhoneNumberModel: string = '';
  public AddressModel: string = '';
  public StateModel: string = '';
  public CountryModel: string = '';

  public SetProfileBtnText: string = 'Set Profile';

  public IsValid: boolean = false;
  public IsProcessing: boolean = false;

  public Validation: InputValidation = new InputValidation();

  @Output('complete') completedEvent: EventEmitter<any> = new EventEmitter();

  public Inputs: IInputType[] = [
    // Fisrt Name
    {
      id: InputID.FirstName,
      model: this.FirstNameModel,
      label: 'First Name',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.FirstNameModel = this.getInput(InputID.FirstName).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const input = this.getInput(InputID.FirstName);
        const text = input.model;

        if(this.Validation.IsNullOrEmpty(text)) {
          input.detail.detailText = emptyFieldErrorText;
        }
        else {
          input.detail.detailText = '';
        }
      }
    },
    // Last Name 
    {
      id: InputID.LastName,
      model: this.LastNameModel,
      label: 'Last Name',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.LastNameModel = this.getInput(InputID.LastName).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const input = this.getInput(InputID.LastName);
        const text = input.model;

        if(this.Validation.IsNullOrEmpty(text)) {
          input.detail.detailText = emptyFieldErrorText;
        }
        else {
          input.detail.detailText = '';
        }
      }
    },
    // Phone Number
    {
      id: InputID.PhoneNumber,
      model: this.PhoneNumberModel,
      label: 'Phone Number',
      type: 'number',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.PhoneNumberModel = this.getInput(InputID.PhoneNumber).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const input = this.getInput(InputID.PhoneNumber);
        const text = input.model;

        if(this.Validation.IsNullOrEmpty(text)) {
          input.detail.detailText = emptyFieldErrorText;
        }
        else {
          input.detail.detailText = '';
        }
      }
    },
    // Address
    {
      id: InputID.Address,
      model: this.AddressModel,
      label: 'Address',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.AddressModel = this.getInput(InputID.Address).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const input = this.getInput(InputID.Address);
        const text = input.model;

        if(this.Validation.IsNullOrEmpty(text)) {
          input.detail.detailText = emptyFieldErrorText;
        }
        else {
          input.detail.detailText = '';
        }
      }
    },
    // State
    {
      id: InputID.State,
      model: this.StateModel,
      label: 'State',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.StateModel = this.getInput(InputID.State).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const input = this.getInput(InputID.State);
        const text = input.model;

        if(this.Validation.IsNullOrEmpty(text)) {
          input.detail.detailText = emptyFieldErrorText;
        }
        else {
          input.detail.detailText = '';
        }
      }
    },
    // Country
    {
      id: InputID.Country,
      model: this.CountryModel,
      label: 'Country',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.CountryModel = this.getInput(InputID.Country).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const input = this.getInput(InputID.Country);
        const text = input.model;

        if(this.Validation.IsNullOrEmpty(text)) {
          input.detail.detailText = emptyFieldErrorText;
        }
        else {
          input.detail.detailText = '';
        }
      }
    },
  ]

  constructor(
    private router: Router,
    private userAuth: UserAuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {}

  inputsChange() {
    if(!this.Validation.IsNullOrEmpty(this.FirstNameModel, this.LastNameModel, this.PhoneNumberModel, this.AddressModel, this.StateModel, this.CountryModel)) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  async set() {
    if(!this.IsValid || this.IsProcessing) return;

    const { value } = await Storage.get({ key: 'userdata' });
    const data = JSON.parse(value) as IUserData[];
    let userdata = data[0];

    const userID = userdata.userid;
    const apiKey = userdata.apikey;

    this.IsProcessing = true;
    this.userAuth.setProfile(userID, this.FirstNameModel, this.LastNameModel, this.PhoneNumberModel, this.AddressModel, this.StateModel, this.CountryModel, apiKey)
      .subscribe((res) => {
        if(res.statuscode == 99) {
          this.proceed(res.userdata);
        }
        else if(res.statuscode == 96){
          this.incorrectApiKey();
        }
        else if(res.statuscode == 95) {
          const input = this.getInput(InputID.PhoneNumber);
          input.detail.detailText = duplicateCredential('phone number');
        }

        this.IsProcessing = false;
      },
      (err) => {
        console.log(err);
        this.checkInternetConnAlert();
        this.IsProcessing = false;
      });
  }

  getInput(id: InputID) {
    const input = this.Inputs.find(input => input.id == id);
    return input;
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

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

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

  reset() {
    this.Inputs.forEach(input => {
      input.model = '';
    })
  }
}

enum InputID{
  FirstName,
  LastName,
  PhoneNumber,
  Address,
  State,
  Country
}