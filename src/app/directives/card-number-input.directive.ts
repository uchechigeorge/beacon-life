import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController, IonInput } from '@ionic/angular';

@Directive({
  selector: '[appCardNumberInput]'
})


export class CardNumberInputDirective implements OnInit {
  
  @Input('appCardNumberInput') IsCard: any;

  public lastValue = '';
  
  constructor(
    private elem: ElementRef<IonInput>,
    private domCtrl: DomController,
  ) { }

  ngOnInit() {
  }

  @HostListener('ionInput', ['$event']) async onInput($event) {
    if(!this.IsCard) return;
    let input = await this.elem.nativeElement.getInputElement();
    let initValue = input.value;
    let inputLength = initValue.length;
    let selectionStart = input.selectionStart;
    let selectionEnd = input.selectionEnd;

    this.domCtrl.write(() => {
      if(this.lastValue.length < initValue.length) {
        
        initValue = initValue.replace(/\s/g, '');
        let initValueArray = initValue.split('');
        let initValueNewArray: string[] = [];
        initValueArray.forEach((value, i) => {
          if(isNaN(parseInt(value))) {
            return;
          }
          initValueNewArray.push(value);

          if(( i + 1 )% 4 == 0) {
            initValueNewArray.push(' ');
          }
        });
        
        initValue = initValueNewArray.join('');

        input.value = initValue;
        if(inputLength > selectionStart) {
          input.selectionStart = selectionStart;
          input.selectionEnd = selectionEnd;
        }
      }

      this.lastValue = input.value;
    })
  }


}
