import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IInputType } from 'src/app/models/app-pages-model';
import { beaconTransferModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText, invalidAccountNumberErrorText, invalidAmountErrorText, invalidNumberErrorText } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';
import { InsertPinService } from 'src/app/services/insert-pin.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';

@Component({
  selector: 'app-beacon-transfer',
  templateUrl: './beacon-transfer.component.html',
  styleUrls: ['./beacon-transfer.component.scss'],
})
export class BeaconTransferComponent implements OnInit {

  public PageTitle: string = 'Transfer to Beacon Account';
  public TransferBtnText: string = 'Pay';

  public AccountNumberModel: string = '';
  public AccountNameModel: string = '';
  public AmountModel: string = '';

  public IsValid: boolean = false;
  public IsProcessing: boolean = false;

  public Validation: InputValidation = new InputValidation();

  public Inputs: IInputType[] = [
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
        this.AccountNumberModel = this.getInput(InputID.AccountNumber).model;
        this.inputsChange();
        if(this.Validation.HasExactly(this.AccountNumberModel, 10)) {
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
        this.inputsChange();
      }
    },
    
  ]

  constructor(
    private modalCtrl: ModalController,
    private insertPinService: InsertPinService,
    private currencyPipe: CustomCurrencyPipe
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', beaconTransferModalID);
  }

  inputsChange() {
    if(!this.Validation.IsNullOrEmpty(this.AccountNameModel) && this.Validation.HasExactly(this.AccountNumberModel, 10) && parseFloat(this.AmountModel) > 0){
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

  getInput(id: InputID) {
    let input = this.Inputs.find(input => input.id == id);

    return input;
  }

  insertPin() {
    if(!this.IsValid || this.IsProcessing) return;

    let amount = this.AmountModel.replace(/\,/g, '');
    let currencyAmount = this.currencyPipe.transform(amount);

    const textHTML = `You are about to transfer ${ currencyAmount } to ${ this.AccountNumberModel } - ${ this.AccountNameModel }`;
    this.insertPinService.present({
      sanitizeString: true,
      textHTML,
      handler: () => console.log('communicating with server....')
    })
    .then((value) => {
      console.log(value);
    });
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
  AccountNumber,
  AccountName,
  Amount
}