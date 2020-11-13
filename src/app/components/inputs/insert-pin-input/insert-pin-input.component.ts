import { Component, OnInit, Input } from '@angular/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { insertPinInputID } from 'src/app/models/component-id';
import { IInsertPinOptions } from 'src/app/models/input-models';

@Component({
  selector: 'app-insert-pin-input',
  templateUrl: './insert-pin-input.component.html',
  styleUrls: ['./insert-pin-input.component.scss'],
})
export class InsertPinInputComponent implements OnInit {

  public keyboardOptions: IKeyBoardOptions[] = [
    { text: '1', value: 1, },
    { text: '2', value: 2, },
    { text: '3', value: 3, },
    { text: '4', value: 4, },
    { text: '5', value: 5, },
    { text: '6', value: 6, },
    { text: '7', value: 7, },
    { text: '8', value: 8, },
    { text: '9', value: 9, },
    { text: '0', value: 0, offset: '4' },
    { hasIcon: true, icon: 'backspace-outline' },
  ]

  public PinArray: string[] = [];

  public PinModel: string = '';

  public PinLength: number = 5;

  public DummyCorrectPin: string = '00000';

  public IsProcessing: boolean = false;

  public Inputs: IPinInput[] = [
    { active: this.PinArray.length >= 1 },
    { active: this.PinArray.length >= 2 },
    { active: this.PinArray.length >= 3 },
    { active: this.PinArray.length >= 4 },
    { active: this.PinArray.length >= 5 },
  ];

  @Input('data') data: IInsertPinOptions;
  
  public InfoText: string = 'Insert your Pin';

  constructor(
    private toastctrl: ToastController,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

    dismissSheet(data?: any, role?: any) {
      this.popoverCtrl.dismiss(data ? data : '', role ? role : '', insertPinInputID);
    }

  addNumber(e: string) {
    if(this.PinArray.length >= this.PinLength) {
      this.process();
      return
    }
    this.PinArray.push(e);
    this.setActive();
    if(this.PinArray.length == this.PinLength) {
      this.process();
    }
  }

  removeNumber() {
    if(this.PinArray.length < 1) return;
    if(this.PinArray.length >= this.PinLength) {
      this.process();
      return
    }
    this.PinArray.pop();
    this.setActive();
  }

  setActive() {
    let pinLength = this.PinArray.length;
    this.Inputs.forEach((input, i) => {
     if(i + 1 <= pinLength) {
      input.active = true;
     }
     else {
       input.active = false;
     }
    });
  }
  

  async process() {
    if(this.IsProcessing) return;
    this.IsProcessing = true;


    this.wait(3000)
      .then(() => {

        this.PinModel = this.PinArray.join('');
        if(this.PinModel == this.DummyCorrectPin) {
          this.proceed();
        }
        else {
          this.invalidPinError();
        }
      });
  }

  proceed() {
    if(this.data.handler)
      this.data.handler();
    this.wait(3000)
      .then(() => {
        this.IsProcessing = false;
        this.reset();
        this.dismissSheet({dismissed: true});
      })
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));



  async showToast() {
    const toast = await this.toastctrl.create({
      message: 'Invalid Pin',
      position: 'top',
      duration: 3000,
    });

    return await toast.present();
  }

  invalidPinError() {
    this.showToast();
    this.reset();
  }

  reset() {
    this.Inputs.forEach(input => {
      input.active = false;
    });
    this.PinArray = [];
  }

  openBackdrop() {
    const backdrop = document.querySelector('.pin-backdrop');
    backdrop.classList.add('pin-backdrop-active');
  }

  closeBackdrop() {
    const backdrop = document.querySelector('.pin-backdrop');
    backdrop.classList.remove('pin-backdrop-active');
  }

}

interface IKeyBoardOptions{
  text?: string,
  value?: string | number,
  offset?: string,
  hasIcon?: boolean,
  icon?: string,
  handler?: () => string | number | void
}

interface IPinInput{
  active?: boolean,
}