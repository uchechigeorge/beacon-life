import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CardCircleComponent } from './svgs/card-circle/card-circle.component';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { EditProfileComponent } from './modals/edit-profile/edit-profile.component';
import { EditProfileInputComponent } from './inputs/edit-profile-input/edit-profile-input.component';
import { ProfilePictureComponent } from './modals/profile-picture/profile-picture.component';
import { ResetPasswordComponent } from './modals/reset-password/reset-password.component';
import { ResetPinComponent } from './modals/reset-pin/reset-pin.component';
import { AccountStatementComponent } from './modals/account-statement/account-statement.component';
import { VerifyAccountComponent } from './modals/verify-account/verify-account.component';
import { ModalHeaderComponent } from './modals/modal-header/modal-header.component';
import { SessionLoginComponent } from './modals/session-login/session-login.component';
import { BuyAirtimeComponent } from './modals/buy-airtime/buy-airtime.component';
import { SetPinComponent } from './signup/set-pin/set-pin.component';
import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';
import { PayBillsComponent } from './modals/pay-bills/pay-bills.component';
import { ReferralDetailsComponent } from './modals/referral-details/referral-details.component';
import { ReferralsComponent } from './modals/referrals/referrals.component';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';
import { BuyCurrencyComponent } from './modals/buy-currency/buy-currency.component';
import { SellCurrencyComponent } from './modals/sell-currency/sell-currency.component';
import { BankTransferComponent } from './modals/bank-transfer/bank-transfer.component';
import { BeaconTransferComponent } from './modals/beacon-transfer/beacon-transfer.component';
import { AddFundCreditCardComponent } from './modals/add-fund-credit-card/add-fund-credit-card.component';
import { AddFundTransferComponent } from './modals/add-fund-transfer/add-fund-transfer.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { InsertPinInputComponent } from './inputs/insert-pin-input/insert-pin-input.component';
import { ModalContentHeaderComponent } from './modal-content-header/modal-content-header.component';
import { SetProfileComponent } from './signup/set-profile/set-profile.component';
import { UploadImageComponent } from './signup/upload-image/upload-image.component';
import { VerifyEmailComponent } from './signup/verify-email/verify-email.component';
import { VerifyPhoneNumberComponent } from './signup/verify-phone-number/verify-phone-number.component';


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
    ForgotPasswordComponent,
    VerifyAccountComponent,
    PayBillsComponent,
    ReferralsComponent,
    ReferralDetailsComponent,
    CurrencyTypeComponent,
    BuyCurrencyComponent,
    SellCurrencyComponent,
    BankTransferComponent,
    BeaconTransferComponent,
    AddFundCreditCardComponent,
    AddFundTransferComponent,
    ModalContentHeaderComponent,
    InsertPinInputComponent,
    SetProfileComponent,
    SetPinComponent,
    UploadImageComponent,
    VerifyEmailComponent,
    VerifyPhoneNumberComponent,
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
    ProfilePictureComponent,
    BuyAirtimeComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    PayBillsComponent,
    ResetPinComponent,
    ReferralsComponent,
    ReferralDetailsComponent,
    BankTransferComponent,
    BeaconTransferComponent,
    CurrencyTypeComponent,
    BuyCurrencyComponent,
    SellCurrencyComponent,
    AddFundCreditCardComponent,
    AddFundTransferComponent,
    ModalContentHeaderComponent,
    InsertPinInputComponent,
    SetProfileComponent,
    SetPinComponent,
    UploadImageComponent,
    VerifyEmailComponent,
    VerifyPhoneNumberComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    SharedPipesModule,
    SharedDirectivesModule,
  ]
})
export class ComponentsModule { }
