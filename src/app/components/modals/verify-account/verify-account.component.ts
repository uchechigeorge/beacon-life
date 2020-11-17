import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { verifyAccountModalID } from 'src/app/models/component-id';
import { InputValidation } from 'src/app/pages/user-auth/validation';
import { emptyFieldErrorText } from 'src/app/models/input-models';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit, AfterViewInit, OnDestroy {

  public PageTitle: string = 'Verify Account';
  public VerifyTitle: string = 'Verify Identity';
  public UploadTitle: string = 'Upload Valid ID';

  public VerifyBtnText: string = 'Proceed';
  public UploadBtnText: string = 'Upload';
  public RestartVerifyBtnText: string = 'Restart';

  public BVNLabel: string = 'Enter Bank Verification Number';
  public BVNModel: string = '';
  public BVNErrorMessage: string = '';
  public DOBLabel: string = 'Enter Date of Birth';
  public DOBModel: string = '';
  public DOBErrorMessage: string = '';
  public BrowseIDLabel: string = 'Enter Bank Verification Number';
  public BrowseIDModel: string = '';
  public BrowseIDErrorMessage: string = '';
  public Validation: InputValidation = new InputValidation();

  public VerificationPendingTitle: string = 'Verification Pending';
  public VerificationPendingText: string = 'Your verification is pending and we will notify you once your verification is completed';
  
  public VerificationRejectedTitle: string = 'Verification Rejected';
  public VerificationRejectedText: string = 'Your application was rejected because your ID card is not valid';

  public HasDetails: boolean = false;

  /**
   * Flag to indicate if the verificaion process is still pending
   */
  public IsPending: boolean = false;
  public AccountVerified: boolean = false;
  public AccountVerifiedText: string = 'This account has been verified';
  public PageState: IPageState = 'proceed';
  public FirstLoad: boolean = true;
  public ProceedValid: boolean = false;
  public UploadValid: boolean = false;
  public IsUploading: boolean = false;


  constructor(
    private modalctrl: ModalController,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  dismissModal() {
    if(this.PageState == "upload") 
    this.PageState = "proceed";
    else {
      this.modalctrl.dismiss('', '' ,verifyAccountModalID);
    }
  }

  async verify() {
    if(!this.ProceedValid || !this.UploadValid || this.IsUploading) return;

    this.IsUploading = true;

    this.wait(3000)
      .then(() => {
        this.IsUploading = false;
        this.IsPending = true;
        this.PageState = "verifying";
      });
    }

  uploadInputChange() {
    if(!this.Validation.IsNullOrEmpty(this.BrowseIDModel)){
      this.UploadValid = true;
    }
    else{
      this.UploadValid = false;
    }
  }

  uploadInputBlur() {
    if(this.Validation.IsNullOrEmpty(this.BrowseIDModel)){
      this.BrowseIDErrorMessage = emptyFieldErrorText;
    }
    else {
      this.BrowseIDErrorMessage = '';
    }
  }

  proceedInputChange() {
    if(!this.Validation.IsNullOrEmpty(this.BVNModel, this.DOBModel)){
      this.ProceedValid = true;
    }
    else{
      this.ProceedValid = false;
    }
  }

  proceedInputBlur(e: string) {
    if(e == 'bvn') {
      if(this.Validation.IsNullOrEmpty(this.BVNModel)){
        this.BVNErrorMessage = emptyFieldErrorText;
      }
      else {
        this.BVNErrorMessage = '';
      }
    }
    if(e == 'dob') {
      if(this.Validation.IsNullOrEmpty(this.DOBModel)){
        this.DOBErrorMessage = emptyFieldErrorText;
      }
      else {
        this.DOBErrorMessage = '';
      }
    }
  }

  async proceed() {
    this.PageState = "upload";
  }

  restartVerification() {
    this.PageState = 'proceed';
    this.IsPending = false;
  }

  reset() {
    this.BVNModel = '';
    this.BrowseIDModel = '';
    this.DOBModel = '';
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));
}

type IPageState = 'proceed' | 'upload' | 'verifying';