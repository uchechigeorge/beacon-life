import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { buyCurrencyModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, invalidAccountNumberErrorText, ISelectOptions } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-buy-currency',
  templateUrl: './buy-currency.component.html',
  styleUrls: ['./buy-currency.component.scss'],
})
export class BuyCurrencyComponent implements OnInit {

  public PageTitle: string = 'Buy Currency';
  public OrderBtnText: string = 'Place Order';

  public CurrencyModel: string = '';
  public ExchangeRateModel: string = '';
  public QuantityModel: string = '';
  public TotalModel: string = '';
  public AccountBankModel: string = '';
  public AccountNoModel: string = '';

  public InfoText: string = 'Enter the details below to buy currency';

  public Validation: InputValidation = new InputValidation();
  public IsValid: boolean = false;
  public IsProcessing: boolean = false;

  public dollarRate: number = 425.92;
  public poundRate: number = 481.53;
  public euroRate: number = 459.49;


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
      label: 'We sell at',
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
      readonly: true,
      directive: 'currency',
      inputBlur: () => {

      },
      modelChanged: () => {

      },
    },
    // Account Bank
    {
      id: InputID.AccountBank,
      model: this.AccountBankModel,
      label: 'Bank',
      placeholder: 'Select Bank',
      isSelect: true,
      selectOptions: this.BankOptions,
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      inputBlur: () => {
        const text = this.getInput(InputID.AccountBank).model;
        
        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.AccountBank, emptyFieldErrorText)
        }
        else {
          this.setErrorText(InputID.AccountBank) 
        }
      },
      modelChanged: () => {
        this.AccountBankModel = this.getInput(InputID.AccountBank).model;
        this.inputsChange();
      },
    },
    // Account Number
    {
      id: InputID.AccountNo,
      model: this.AccountNoModel,
      label: 'Account Number',
      type: 'number',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      inputBlur: () => {
        const text = this.getInput(InputID.AccountNo).model;
        
        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.AccountNo, emptyFieldErrorText);
        }
        else if(!this.Validation.HasExactly(text, 10)) {
          this.setErrorText(InputID.AccountNo, invalidAccountNumberErrorText);
        }
        else {
          this.setErrorText(InputID.AccountNo) 
        }
      },
      modelChanged: () => {
        this.AccountNoModel = this.getInput(InputID.AccountNo).model;
        this.inputsChange();
      },
    },
  ]

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', buyCurrencyModalID);
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
    
    if(!this.Validation.IsNullOrEmpty(this.CurrencyModel, this.AccountBankModel, this.QuantityModel) && this.Validation.HasExactly(this.AccountNoModel, 10)) {
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

}

enum InputID {
  Currency,
  ExchangeRate,
  Quantity,
  Total,
  AccountBank,
  AccountNo,
}

type CurrencyRate = 'dollar' | 'pound' | 'euro';