import { Injectable } from '@angular/core';
import { InsertPinInputComponent } from '../components/inputs/insert-pin-input/insert-pin-input.component';
import { insertPinInputID } from '../models/component-id';
import { AnimationController, PopoverController } from '@ionic/angular';
import { IInsertPinOptions } from '../models/input-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsertPinService {

  constructor(
    private animationCtrl: AnimationController,
    private popoverCtrl: PopoverController
  ) { }

  async present(options?: IInsertPinOptions): Promise<any> {

    const enterAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('.popover-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'translateY(100%)' },
          { offset: 0.8, opacity: '1', transform: 'translateY(0)' }
        ]);

      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    }


    const popover = await this.popoverCtrl.create({
      component: InsertPinInputComponent,
      id: insertPinInputID,
      cssClass: 'insert-pin-popover',
      backdropDismiss: false,
      componentProps: {
        'data': options
      },
      enterAnimation,
      leaveAnimation,
    });
    const popoverElem = document.querySelector('.insert-pin-popover .popover-wrapper .popover-content') as HTMLIonAppElement;

    
    await popover.present()
    .then(() => {
      popoverElem.style.top = '0';
      popoverElem.style.left = '0';
      popoverElem.style.transformOrigin = '50% 50% 0';
    });
    
    const { data } = await popover.onWillDismiss();
    return data;
    
  }
}
