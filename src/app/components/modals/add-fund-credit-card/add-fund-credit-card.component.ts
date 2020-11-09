import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { addFundCreditCardModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, invalidAmountErrorText, invalidCardNumberErrorText, invalidInputErrorText } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-add-fund-credit-card',
  templateUrl: './add-fund-credit-card.component.html',
  styleUrls: ['./add-fund-credit-card.component.scss'],
})
export class AddFundCreditCardComponent implements OnInit {
  
  public PageTitle: string = 'Fund Via Credit Card';
  public FundBtnText: string = 'Fund Account';

  public IsValid: boolean = false;
  public IsProcessing: boolean = false;

  public AmountModel: string = '';
  public CardNumberModel: string = '';
  public CardExDateModel: string = '';
  public CardCVVModel: string = '';

  public Validation: InputValidation = new InputValidation();

  public Inputs: IInputType[] = [
    // amount
    {
      id: InputID.Amount,
      model: this.AmountModel,
      label: 'Amount',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      type: 'text',
      directive: 'currency',
      inputMode: 'numeric',
      fullWidth: true,
      inputBlur: () => {
        const text = this.getInput(InputID.Amount).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.Amount, emptyFieldErrorText);
        }
        else if(!this.Validation.IsValidAmount(text)) {
          this.setErrorText(InputID.Amount, invalidAmountErrorText);
        }
        else {
          this.setErrorText(InputID.Amount);
        }
      },
      modelChanged: () => {
        this.AmountModel = this.getInput(InputID.Amount).model;
        this.inputsChange();
      },
    },
    // Card number
    {
      id: InputID.CardNumber,
      model: this.CardNumberModel,
      label: 'Card Number',
      directive: 'card-number',
      placeholder: '0000 0000 0000 0000',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      type: 'text',
      fullWidth: true,
      inputBlur: () => {
        const text = this.getInput(InputID.CardNumber).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.CardNumber, emptyFieldErrorText);
        }
        else if(!this.Validation.IsNumber(text)) {
          this.setErrorText(InputID.CardNumber, invalidCardNumberErrorText);
        }
        else if(!this.Validation.HasExactly(this.Validation.RemoveWhiteSpace(text), 16)) {
          this.setErrorText(InputID.CardNumber, invalidCardNumberErrorText);
        }
        else {
          this.setErrorText(InputID.CardNumber);
        }
      },
      modelChanged: () => {
        this.CardNumberModel = this.getInput(InputID.CardNumber).model;
        this.inputsChange();
      },
    },
    // Card expiry date
    {
      id: InputID.CardExDate,
      model: this.CardExDateModel,
      label: 'Expiry Date',
      placeholder: '20/20',
      directive: 'card-expiry-date',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      type: 'text',
      inputMode: 'numeric',
      fullWidth: false,
      inputBlur: () => {
        const text = this.getInput(InputID.CardExDate).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.CardExDate, emptyFieldErrorText);
        }
        else if(!this.Validation.MatchRegEx(/^[0-9]{2}\/[0-9]{2}$/g, text)) {
          this.setErrorText(InputID.CardExDate, invalidInputErrorText);
        }
        else {
          this.setErrorText(InputID.CardExDate);
        }
      },
      modelChanged: () => {
        this.CardExDateModel = this.getInput(InputID.CardExDate).model;
        this.inputsChange();
      },
    },
    {
      id: InputID.CardCVV,
      model: this.CardCVVModel,
      label: 'CCV',
      placeholder: '123',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      type: 'number',
      fullWidth: false,
      inputBlur: () => {
        const text = this.getInput(InputID.CardCVV).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.CardCVV, emptyFieldErrorText);
        }
        else if(!this.Validation.IsNumber(text)) {
          this.setErrorText(InputID.CardCVV, invalidInputErrorText);
        }
        else if(!this.Validation.IsGreaterThan(text, 2)) {
          this.setErrorText(InputID.CardCVV, invalidInputErrorText);
        }
        else {
          this.setErrorText(InputID.CardCVV);
        }
      },
      modelChanged: () => {
        this.CardCVVModel = this.getInput(InputID.CardCVV).model;
        this.inputsChange();
      },
    },
  ] 

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', addFundCreditCardModalID);
  }

  inputsChange() {
    if(this.Validation.IsValidAmount(this.AmountModel) && this.Validation.MatchRegEx(/^[0-9]{2}\/[0-9]{2}$/g, this.CardExDateModel) 
      && this.Validation.IsGreaterThan(this.CardCVVModel, 2) && this.Validation.HasExactly(this.Validation.RemoveWhiteSpace(this.CardNumberModel), 16)
      && this.Validation.IsNumber(this.CardCVVModel, this.CardNumberModel)
      ) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  fund() {
    if(!this.IsValid || this.IsProcessing) return;

    this.IsProcessing = true;

    this.wait(3000)
      .then(() => {
        this.proceed();
        this.IsProcessing = false;
      })
  }

  proceed() {
    this.reset();
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

  getInput(id: InputID) {
    let input = this.Inputs.find(input => input.id == id);

    return input;
  }

  reset() {
    this.Inputs.forEach(input => {
      input.model = '';
    })
  }

  setErrorText(id: InputID, message?: string) {
    if(!message) message = ''; 
    let input = this.Inputs.find(input => input.id == id);

    input.detail.detailText = message;
  }
}

enum InputID{
  Amount,
  CardNumber,
  CardExDate,
  CardCVV
}