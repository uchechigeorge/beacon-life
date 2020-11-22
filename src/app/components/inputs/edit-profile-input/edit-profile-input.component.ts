import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-input',
  templateUrl: './edit-profile-input.component.html',
  styleUrls: ['./edit-profile-input.component.scss'],
})
export class EditProfileInputComponent implements OnInit {

  public canEdit: boolean = false;
  public prevValue: string = '';
  @Input() icon: string = '';
  @Input() model: string = '';
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() inputmode: string = 'text';
  @Input() label: string = '';
  @Input() OKText: string = 'OK';
  @Input() iconColor: string = 'custom-secondary';
  @Input() CancelText: string = 'Cancel';
  @Input() updateInput : () => boolean | void | Promise<boolean | void>;
  @Output() onBlurEvent: EventEmitter<any> = new EventEmitter();
  @Output() onChangeEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild(IonInput) input: IonInput;

  constructor() { }

  ngOnInit() {}

  exitEditMode() {
    this.model = this.prevValue;
    this.canEdit = false;
  }

  enterEditMode() {
    this.canEdit = true;
  }

  async check() {
    if(this.updateInput == undefined) return;
    let isValid = await this.updateInput();

    console.log({
      model: this.model,
      isValid
    });

    if(isValid == false) {
      this.input.setFocus();
      let elem = await this.input.getInputElement();
      elem.select();
      this.canEdit = true;
      this.model = this.prevValue;
      this.onChange();
    }
    else{
      this.canEdit = false;
    }
  }

  async setFocus() {
    let elem = await this.input.getInputElement();
    elem.select();
    this.input.setFocus();
    this.prevValue = this.model;
    this.enterEditMode();
  }

  onChange(e?: any) {
    this.onChangeEvent.emit({
      event: e,
      model: this.model
    });
  }

  onBlur(e) {
    this.onBlurEvent.emit(e);
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

}
