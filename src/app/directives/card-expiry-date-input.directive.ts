import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, IonInput } from '@ionic/angular';

@Directive({
  selector: '[appCardExpiryDateInput]'
})
export class CardExpiryDateInputDirective {

  @Input('appCardExpiryDateInput') IsDate: any;

  public lastValue: string = '';

  constructor(
    private elem: ElementRef<IonInput>,
    private domCtrl: DomController,
  ) { }

  ngOnInit() {
  }

  @HostListener('ionChange', ['$event']) async onInput($event) {
    if(!this.IsDate) return;
    let input = await this.elem.nativeElement.getInputElement();
    let initValue = input.value;
   
    this.domCtrl.write(() => {
      if(this.lastValue.length < initValue.length) {

        initValue = initValue.slice(0, 5);

        let initValueArray: string[] = initValue.split('');
        let newInitValueArray: string[] = initValueArray.filter((value => {
          return !isNaN(parseInt(value));
        }));

        if(initValue.length > 2) {
          newInitValueArray.splice(2, 0, '/');
        }
        
        initValue = newInitValueArray.join('');
        input.value = initValue;
      }

      this.lastValue = input.value;
    });
  }
}