import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IInputType } from 'src/app/models/app-pages-model';
import { accountStatementModalID } from 'src/app/models/component-id';
import { emptyFieldErrorText } from 'src/app/models/input-models';
import { InputValidation } from 'src/app/pages/user-auth/validation';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss'],
})
export class AccountStatementComponent implements OnInit {

  public PageTitle: string = 'Account Statement';

  public StartDateModel: string = '';
  public EndDateModel: string = '';

  public IsValid: boolean = false;
  public IsDownloading: boolean = false;

  public Validation: InputValidation = new InputValidation();

  public Inputs: IInputType[] = [
    {
      id: InputID.StartDate,
      model: this.StartDateModel,
      label: 'Start Date',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      inputBlur: () => {
        const text = this.getInput(InputID.StartDate).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.StartDate, emptyFieldErrorText);
        }
        else {
          this.setErrorText(InputID.StartDate);
        }
      },
      modelChanged: () => {
        this.StartDateModel = this.getInput(InputID.StartDate).model;
        this.inputsChange();
      }
    },
    {
      id: InputID.EndDate,
      model: this.EndDateModel,
      label: 'End Date',
      detail: {
        detailText: '',
        detailTextColor: 'danger',
      },
      inputBlur: () => {
        const text = this.getInput(InputID.EndDate).model;

        if(this.Validation.IsNullOrEmpty(text)) {
          this.setErrorText(InputID.EndDate, emptyFieldErrorText);
        }
        else {
          this.setErrorText(InputID.EndDate);
        }
      },
      modelChanged: () => {
        this.EndDateModel = this.getInput(InputID.EndDate).model;
        this.inputsChange();
      }
    },
  ]

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss('', '', accountStatementModalID);
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
    if(!this.Validation.IsNullOrEmpty(this.StartDateModel, this.EndDateModel)) {
      this.IsValid = true;
    }
    else {
      this.IsValid = false;
    }
  }

  downloadAccStatement() {
    if(!this.IsValid) return;

    this.showToast('Downloading in the background...', 3000);
      
  }

  wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async showToast(message: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'middle',
    });

    

    return await toast.present();
  }  
}

enum InputID{
  StartDate,
  EndDate,
}
