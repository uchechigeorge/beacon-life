import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Plugins } from "@capacitor/core";

import { IInputType, IListDetailsOptions } from 'src/app/models/app-pages-model';
import { sellCurrencyModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, ISelectOptions } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-sell-currency',
  templateUrl: './sell-currency.component.html',
  styleUrls: ['./sell-currency.component.scss'],
})
export class SellCurrencyComponent implements OnInit {

  
  public PageTitle: string = 'Sell Currency';
  public OrderBtnText: string = 'Place Order';

  public CurrencyModel: string = '';
  public ExchangeRateModel: string = '';
  public QuantityModel: string = '';
  public TotalModel: string = '';

  public InfoText: string = 'Enter the details below to sell currency';

  public Validation: InputValidation = new InputValidation();
  public IsValid: boolean = false;
  public IsProcessing: boolean = false;

  public dollarRate: number = 420.92;
  public poundRate: number = 476.53;
  public euroRate: number = 455.49;

  public AccountNumber: string = '0284289323';
  public AccountName: string = 'Beacon Life Inc.';
  public AccountBank: string = 'First Bank Plc.';
  public AccountDetailsInfo: string = 'You will credit us on the following account';


  public CurrencyOptions: ISelectOptions[] = [
    {
      text: 'US Dollars - USD',
      value: 'dollar',
    },
    {
      text: 'Pound Sterling - GBP',
      value: 'pound',
    },
    {
      text: 'Euro - EUR',
      value: 'euro',
    },
  ]

  public BankOptions: ISelectOptions[] = [
    {
      text: 'Zenith Bank PLC',
      value: 'zenith',
    },
    {
      text: 'First Bank PLC',
      value: 'first-bank',
    },
    {
      text: 'UBA Bank',
      value: 'uba',
    },
  ]

  public Inputs: IInputType[] = [
    // Currency
    {
      id: InputID.Currency,
      model: this.CurrencyModel,
      label: 'Currency',
      placeholder: 'Select Currency',
      isSelect: true,
      selectOptions: this.CurrencyOptions,
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      inputBlur: () => {
        const text = this.getInput(InputID.Currency).model;
        
        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.Currency, emptyFieldErrorText)
        }
        else {
          this.setErrorText(InputID.Currency) 
        }

        this.setRate(text as CurrencyRate);
      },
      modelChanged: () => {
        this.CurrencyModel = this.getInput(InputID.Currency).model;
        this.calculateTotal();
        this.inputsChange();
      },

    },
    // Exchange Rate
    {
      id: InputID.ExchangeRate,
      model: this.ExchangeRateModel,
      label: 'We buy at',
      labelPosition: 'stacked',
      readonly: true,  
      inputBlur: () => {

      },
      modelChanged: () => {

      },
    },
    // Quantity
    {
      id: InputID.Quantity,
      model: this.ExchangeRateModel,
      label: 'Quantity',
      type: 'text',
      inputMode: 'numeric',
      directive: 'currency',
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      inputBlur: () => {
        const text = this.getInput(InputID.Quantity).model;
        
        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.Quantity, emptyFieldErrorText);
        }
        else {
          this.setErrorText(InputID.Quantity) 
        }
      },
      modelChanged: () => {
        this.QuantityModel = this.getInput(InputID.Quantity).model;
        this.calculateTotal();
        this.inputsChange();
      },
    },
    // Total
    {
      id: InputID.Total,
      model: this.TotalModel,
      label: 'Total',
      labelPosition: 'stacked',
      type: 'text',
      directive: 'currency',
      readonly: true,
      inputBlur: () => {

      },
      modelChanged: () => {

      },
    },
  ]

  public AccountDetails: IListDetailsOptions[] = [
    {
      title: 'Account Number',
      icon: 'pencil',
      subtitle: this.AccountNumber,
      showSecondaryIcon: true,
      secondaryIcon: 'copy',
    },
    {
      title: 'Account Name',
      icon: 'person',
      subtitle: this.AccountName,
    },
    {
      title: 'Account Bank',
      icon: 'business',
      subtitle: this.AccountBank,
    },
  ]

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', sellCurrencyModalID);
  }

  currencyInputChange() {
    console.log(this.CurrencyModel);
  }

  getInput(id: InputID) {
    let input = this.Inputs.find(input => input.id == id);
    return input;
  }

  setErrorText(id: InputID, message?: string) {
    if(!message) message = '';

    let input = this.Inputs.find(input => input.id == id);

    input.detail.detailText = message;
  }

  setModelText(id: InputID, text?: string) {
    if(!text) text = '';

    let input = this.Inputs.find(input => input.id == id);

    input.model = text;
  }

  inputsChange() {
    
    if(!this.Validation.IsNullOrEmpty(this.CurrencyModel, this.QuantityModel) && parseFloat(this.QuantityModel) > 0) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  placeOrder() {
    if(!this.IsValid || this.IsProcessing) return;

    this.IsProcessing = true;

    this.wait(3000)
      .then(() => {
        this.IsProcessing = false;
        this.proceed();
      })
  }

  proceed() {
    this.reset();
  }

  reset() {
    this.Inputs.forEach(input => {
      input.model = '';
    })
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

  calculateTotal() {
    const rate = this.CurrencyModel as CurrencyRate;
    let amountString = this.getInput(InputID.Quantity).model;
    amountString = amountString.replace(/,/g, '');
    let amount = parseInt(amountString);

    let valueRate = 0.00;
    switch (rate) {
      case 'dollar':
        valueRate = this.dollarRate;
        break;
      case 'euro':
        valueRate = this.euroRate;
        break;
      case 'pound':
        valueRate = this.poundRate;
        break;
      default:
        valueRate = 0.00;
    }

    if(valueRate > 0) {
      if(isNaN(amount)) amount = 0;

      let total = valueRate * amount;
      let totalText = total.toFixed(2);

      if(total > 0){
        this.setModelText(InputID.Total, totalText);
        this.TotalModel = totalText;
      }
      else{
        this.setModelText(InputID.Total, '');
        this.TotalModel = totalText;
      }
      // console.log({quantity: this.QuantityModel, total: this.TotalModel});
    }


  }

  setRate(value: CurrencyRate) {
    let valueRate = 0.00;
    switch (value) {
      case 'dollar':
        valueRate = this.dollarRate;
        break;
      case 'euro':
        valueRate = this.euroRate;
        break;
      case 'pound':
        valueRate = this.poundRate;
        break;
      default:
        valueRate = 0.00;
    }

    if(valueRate > 0) {
      this.setModelText(InputID.ExchangeRate, valueRate.toString());
    }
  }

  async copyAccNumber() {
    Clipboard.write({
      string: this.AccountNumber
    });

    const toast = await this.toastCtrl.create({
      message: 'Account Number copied',
      duration: 1000,
    });

    return await toast.present();
  }
}

enum InputID {
  Currency,
  ExchangeRate,
  Quantity,
  Total,
}

type CurrencyRate = 'dollar' | 'pound' | 'euro';