import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { buyAirtimeModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, ISelectOptions } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-buy-airtime',
  templateUrl: './buy-airtime.component.html',
  styleUrls: ['./buy-airtime.component.scss'],
})
export class BuyAirtimeComponent implements OnInit {

  public PageTitle: string = 'Buy Airtime';

  public NetworkModel: string = '';
  public NetworkLabel: string = 'Network';
  public NetworkPlaceholder: string = 'Select a service';
  public BankErrorText: string = '';
  public AmountModel: string = '';
  public PhoneNumberModel: string = '';

  public IsValid: boolean = false;
  public IsProcessing: boolean = false;

  public BuyBtnText: string = 'Buy';

  public Validation: InputValidation = new InputValidation();

  public AvailableBanks: ISelectOptions[] = [
    {
      text: 'MTN',
      value: 'mtn'
    },
    {
      text: 'Airtel',
      value: 'airtel'
    },
    {
      text: '9 Mobile',
      value: '9mobile'
    },
    {
      text: 'GLO World',
      value: 'glo'
    },
  ]

  public Inputs: IInputType[] = [
    // Amount
    {
      id: InputID.Amount,
      model: this.NetworkModel,
      label: 'Amount',
      type: 'text',
      directive: 'currency',
      inputMode: 'numeric',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.AmountModel = this.getInput(InputID.Amount).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const text = this.getInput(InputID.Amount).model;

        if(this.Validation.IsNullOrEmpty(text)){
          this.setErrorText(InputID.Amount, emptyFieldErrorText);
        }
        else {
          this.setErrorText(InputID.Amount);
        }
      },
    },
    // Phone Number
    {
      id: InputID.PhoneNumber,
      model: this.PhoneNumberModel,
      label: 'Phone Number',
      type: 'number',
      inputMode: 'tel',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      modelChanged: () => {
        this.PhoneNumberModel = this.getInput(InputID.PhoneNumber).model;
        this.inputsChange();
      },
      inputBlur: () => {
        const text = this.getInput(InputID.PhoneNumber).model;

        if(this.Validation.IsNullOrEmpty(text)){
          this.setErrorText(InputID.PhoneNumber, emptyFieldErrorText);
        }
        else {
          this.setErrorText(InputID.PhoneNumber);
        }
      },
    },
  ]

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', buyAirtimeModalID);
  }

  bankInputChange() {
    console.log(this.NetworkModel);
  }

  bankInputBlur() {
    let text = this.NetworkModel;
    if(text == undefined) text = '';

    if(this.Validation.IsNullOrEmpty(text)) {
      this.BankErrorText = emptyFieldErrorText
    }
    else {
      this.BankErrorText = '';
    }
  }

  getInput(id: InputID) {
    const input = this.Inputs.find(input => input.id == id);

    return input;
  }

  setErrorText(id: InputID, message?: string) {
    if(!message) message = '';

    const input = this.Inputs.find(input => input.id == id);
    input.detail.detailText = message;
  }

  inputsChange() {
    if(!this.Validation.IsNullOrEmpty(this.NetworkModel, this.AmountModel, this.PhoneNumberModel)){
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  process() {
    if(!this.IsValid || this.IsProcessing) return;

    this.IsProcessing = true;

    this.wait(3000)
      .then(() => {
        this.IsProcessing = false;
        this.proceed();
      })
  }

  proceed() {
    this.dismissModal();
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));


}

enum InputID{
  Amount,
  PhoneNumber
}