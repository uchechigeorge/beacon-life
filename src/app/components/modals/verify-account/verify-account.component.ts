import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { verifyAccountModalID } from 'src/app/models/component-id';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {

  public PageTitle: string = 'Verify Account';

  public VerifyBtnText: string = 'Verify';
  public UploadBtnText: string = 'Upload';
  public RestartVerifyBtnText: string = 'Restart';

  public VerificationPendingTitle: string = 'Verification Pending';
  public VerificationPendingText: string = 'Your verification is pending and we will notify you once your verification is completed';
  
  public VerificationRejectedTitle: string = 'Verification Rejected';
  public VerificationRejectedText: string = 'Your application was rejected because your ID card is not valid';

  public HasDetails: boolean = false;
  public IsPending: boolean = false;

  constructor(
    private modalctrl: ModalController,
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalctrl.dismiss('', '' ,verifyAccountModalID);
  }

  verify() {
    this.HasDetails = true;
  }

  restartVerification() {
    this.IsPending = true;
  }
}
