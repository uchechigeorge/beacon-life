import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { bankTransferModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, invalidAccountNumberErrorText, invalidAmountErrorText, invalidNumberErrorText, ISelectOptions } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.scss'],
})
export class BankTransferComponent implements OnInit {

  public PageTitle: string = 'Transfer to Other Bank Account';
  public TransferBtnText: string = 'Pay';

  public BankModel: string = '';
  public AccountNumberModel: string = '';
  public AccountNameModel: string = '';
  public AmountModel: string = '';

  public IsValid: boolean = false;
  public IsProcessing: boolean = false;

  public Validation: InputValidation = new InputValidation();

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
    // Bank
    {
      id: InputID.Bank,
      model: this.BankModel,
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      label: 'Bank',
      placeholder: 'Select Bank',
      isSelect: true,
      selectOptions: this.BankOptions,
      inputBlur: () => {
        const text = this.getInput(InputID.Bank).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.Bank, emptyFieldErrorText)
        }
        else {
          this.setErrorText(InputID.Bank) 
        }


      },
      modelChanged: () => {
        this.BankModel = this.getInput(InputID.Bank).model;
        this.verifyAccountName();
      }
    },
    // Account Number
    {
      id: InputID.AccountNumber,
      model: this.AccountNumberModel,
      label: 'Account Number',
      type: 'number',
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      inputBlur: () => {
        const text = this.getInput(InputID.AccountNumber).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.AccountNumber, emptyFieldErrorText);
        }
        else if(!this.Validation.HasExactly(text, 10)) {
          this.setErrorText(InputID.AccountNumber, invalidAccountNumberErrorText);
        }
        else{
          this.setErrorText(InputID.AccountNumber);
        }

      },
      modelChanged: () => {
        this.verifyAccountName();
      }
    },
    // Account Name
    {
      id: InputID.AccountName,
      model: this.AccountNameModel,
      label: 'Account Name',
      type: 'text',
      readonly: true,
      labelPosition: 'stacked',
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      inputBlur: () => {

      },
      modelChanged: () => {
        this.AccountNameModel = this.getInput(InputID.AccountName).model;
        this.inputsChange();
      }
    },
    // Amount
    {
      id: InputID.Amount,
      model: this.AmountModel,
      label: 'Amount',
      type: 'text',
      inputMode: 'numeric',
      directive: 'currency',
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      inputBlur: () => {
        const text = this.getInput(InputID.Amount).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.Amount, emptyFieldErrorText);
        }
        else if(!this.Validation.IsNumber(text)) {
          this.setErrorText(InputID.Amount, invalidNumberErrorText);
        }
        else if(!this.Validation.IsValidAmount(text)) {
          this.setErrorText(InputID.Amount, invalidAmountErrorText);
        }
        else{
          this.setErrorText(InputID.Amount);
        }
      },
      modelChanged: () => {
        this.AmountModel = this.getInput(InputID.Amount).model;
        this.inputsChange();
      }
    },
  ]

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', bankTransferModalID);
  }

  inputsChange() {
    if(!this.Validation.IsNullOrEmpty(this.AccountNameModel, this.BankModel) && this.Validation.HasExactly(this.AccountNumberModel, 10) && parseFloat(this.AmountModel) > 0){
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms))

  pay() {
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

  verifyAccountName() {
    this.AccountNumberModel = this.getInput(InputID.AccountNumber).model;
    this.BankModel = this.getInput(InputID.Bank).model;
    this.inputsChange();
    if(this.Validation.HasExactly(this.AccountNumberModel, 10) && !this.Validation.IsNullOrEmpty(this.BankModel)) {
      this.setInput(InputID.AccountName, 'Verifying...');

      this.wait(3000)
        .then(() => {
          let name = 'Emmanuel Soligbo';
          this.setInput(InputID.AccountName, name);
          this.AccountNameModel = name;
          this.inputsChange();
        })
    }
    else {
      this.setInput(InputID.AccountName);
    }
  }

  getInput(id: InputID) {
    let input = this.Inputs.find(input => input.id == id);

    return input;
  }

  setInput(id: InputID, message?: string) {
    if(!message) message = '';

    let input = this.Inputs.find(input => input.id == id);
    input.model = message;
  }

  setErrorText(id: InputID, message?: string) {
    if(!message) message = '';

    let input = this.Inputs.find(input => input.id == id);
    input.detail.detailText = message;
  }

  reset() {
    this.Inputs.forEach(input => {
      input.model = '';
    })
  }

}

enum InputID{
  Bank,
  AccountNumber,
  AccountName,
  Amount,
}