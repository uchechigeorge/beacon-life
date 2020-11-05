import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CardCircleComponent } from './svgs/card-circle/card-circle.component';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { EditProfileComponent } from './modals/edit-profile/edit-profile.component';
import { EditProfileInputComponent } from './edit-profile-input/edit-profile-input.component';
import { ProfilePictureComponent } from './modals/profile-picture/profile-picture.component';
import { ResetPasswordComponent } from './modals/reset-password/reset-password.component';
import { ResetPinComponent } from './modals/reset-pin/reset-pin.component';
import { AccountStatementComponent } from './modals/account-statement/account-statement.component';
import { VerifyAccountComponent } from './modals/verify-account/verify-account.component';
import { ModalHeaderComponent } from './modals/modal-header/modal-header.component';
import { SessionLoginComponent } from './modals/session-login/session-login.component';
import { BuyAirtimeComponent } from './modals/buy-airtime/buy-airtime.component';
import { SetPinComponent } from './modals/set-pin/set-pin.component';
import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';
import { PayBillsComponent } from './modals/pay-bills/pay-bills.component';



@NgModule({
  declarations: [
    CardCircleComponent,
    TransactionCardComponent,
    AccountStatementComponent,
    EditProfileComponent,
    ProfilePictureComponent,
    BuyAirtimeComponent,
    EditProfileInputComponent,
    ModalHeaderComponent,
    ResetPasswordComponent,
    SessionLoginComponent,
    ResetPinComponent,
    SetPinComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    PayBillsComponent,
  ],
  exports: [
    CardCircleComponent,
    TransactionCardComponent,
    AccountStatementComponent,
    EditProfileComponent,
    EditProfileInputComponent,
    ForgotPasswordComponent,
    SessionLoginComponent,
    ModalHeaderComponent,
    SetPinComponent,
    ProfilePictureComponent,
    BuyAirtimeComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    PayBillsComponent,
    ResetPinComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
  ]
})
export class ComponentsModule { }
