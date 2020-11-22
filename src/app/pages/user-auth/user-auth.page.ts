import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, IonSlides, ModalController, ToastController } from '@ionic/angular';
import { ComponentRef } from "@ionic/core";
import { Plugins } from "@capacitor/core";

import { ForgotPasswordComponent } from 'src/app/components/modals/forgot-password/forgot-password.component';
import { SessionLoginComponent } from 'src/app/components/modals/session-login/session-login.component';
import { IInputType } from 'src/app/models/app-pages-model';
import { forgotPasswordModalID, sessionsLoginModalID, setPinModalID } from 'src/app/models/component-id';
import { confirmPasswordMismatch, emptyFieldErrorText, 
  invalidEmailErrorText, optionalField, weakPasswordLength, duplicateCredential, internetConnectionError } from 'src/app/models/input-models';
import { signInRoute, SignUpProgress, completeSignUpRoute, homeRoute } from 'src/app/models/route-models';
import { InputValidation } from './validation';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { CustomRouteService } from 'src/app/services/custom-route.service';
import { IUserData, IUserDataApiResponse } from 'src/app/models/api-response-models';

const { Storage } = Plugins;

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.page.html',
  styleUrls: ['./user-auth.page.scss'],
})
export class UserAuthPage implements OnInit, AfterViewInit {

  public SignUpEmailModel = '';
  public SignUpPasswordModel = '';
  public SignUpConfirmPasswordModel = '';
  public ReferralCodeModel = '';

  public SignInEmailModel = '';
  public SignInPasswordModel = '';
  public Validation: InputValidation = new InputValidation();

  public SignUpBtnText: string = 'Next';
  public SignUpBtnSubText: string = 'Already have an account?';
  public SignInBtnText: string = 'Login';
  public SignInBtnSubText: string = 'No account?';
  public SignUpLogo: string = 'person-add-outline';
  public SignInLogo: string = 'log-in-outline';
  public SignUpTitle: string = 'Sign Up';
  public SignInTitle: string = 'Sign In';
  public OnSignUpPage: boolean = true;
  public ForgotPasswordText: string = 'Forgotten Password?';

  public IsSigningUp: boolean = false;
  public HasSignUpErrors: boolean = true;
  public IsSigningIn: boolean = false;
  public HasSignInErrors: boolean = true;

  public SignUpInputs: IInputType[] = [
    // Email
    {
      id: InputID.SignUpEmail,
      model: this.SignUpEmailModel,
      label: 'Email',
      type:  'email',
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      modelChanged: () => {
        this.SignUpEmailModel = this.getModelText(InputID.SignUpEmail);
        this.inputsSignUpChange();
      },
      inputBlur: () => {
        const email = this.getModelText(InputID.SignUpEmail);

        if(this.Validation.IsNullOrEmpty(email)) {
          this.setErrorText(InputID.SignUpEmail, true, emptyFieldErrorText);
        }
        else if(!this.Validation.IsValidEmail(email)){
          this.setErrorText(InputID.SignUpEmail, true, invalidEmailErrorText);
        }
        else {
          this.setErrorText(InputID.SignUpEmail, true, '')
        }
      }
    },
    // Password
    {
      id: InputID.SignUpPassword,
      model: this.SignUpPasswordModel,
      label: 'Password',
      type:  'password',
      passwordIcon: 'eye',
      isPassword: true,
      passwordVisible: false,
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      modelChanged: () => {
        this.SignUpConfirmPasswordModel = this.getModelText(InputID.SignUpPassword);
        this.inputsSignUpChange();
      },
      inputBlur: () => {
        const password = this.getModelText(InputID.SignUpPassword);

        
        if(this.Validation.IsNullOrEmpty(password)) {
          this.setErrorText(InputID.SignUpPassword, true, emptyFieldErrorText);
        }
        else if(!this.Validation.IsValidPassword(password, 5, 50)){
          this.setErrorText(InputID.SignUpPassword, true, weakPasswordLength(5, 50));
        }
        else {
          this.setErrorText(InputID.SignUpPassword, true, '');
        }
      },
      togglePasswordVisibility: () => {
        this.togglePassword(InputID.SignUpPassword);
      }
    },
    // Confirm Password 
    {
      id: InputID.SignUpConfirmPassword,
      model: this.SignUpConfirmPasswordModel,
      label: 'Confirm Password',
      type: 'password',
      passwordIcon: 'eye',
      isPassword: true,
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      modelChanged: () => {
        this.SignUpPasswordModel = this.getModelText(InputID.SignUpConfirmPassword);
        this.inputsSignUpChange();
      },
      inputBlur: () => {
        const password = this.getModelText(InputID.SignUpPassword);
        const confirmpassword = this.getModelText(InputID.SignUpConfirmPassword);

        
        if(!this.Validation.ConfirmPasswordMatch(password, confirmpassword)) {
          this.setErrorText(InputID.SignUpConfirmPassword, true, confirmPasswordMismatch);
        }
        else {
          this.setErrorText(InputID.SignUpConfirmPassword, true, '');
        }
      },
      togglePasswordVisibility: () => {
        this.togglePassword(InputID.SignUpConfirmPassword);
      }
    },
    // Referral Code 
    {
      id: InputID.ReferralCode,
      model: this.ReferralCodeModel,
      label: 'Referral Code',
      type:  'text',
      detail: {
        detailText: optionalField,
        detailTextColor: 'medium',
      },
      modelChanged: () => {
        this.ReferralCodeModel = this.getModelText(InputID.ReferralCode);
      },
      inputBlur: () => {
        
      }
    },
  ];

  public SignInInputs: IInputType[] = [
    // Email
    {
      id: InputID.SignInEmail,
      model: this.SignInEmailModel,
      type: 'email',
      label: 'Email',
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      modelChanged: () => {
        this.SignInEmailModel = this.getModelText(InputID.SignInEmail, false);
        this.inputsSignInChange();
      },
      inputBlur: () => {
        const email = this.getModelText(InputID.SignInEmail, false);

        if(this.Validation.IsNullOrEmpty(email)) {
          this.setErrorText(InputID.SignInEmail, false, emptyFieldErrorText);
        }
        else if(!this.Validation.IsValidEmail(email)){
          this.setErrorText(InputID.SignInEmail, false, invalidEmailErrorText);
        }
        else {
          this.setErrorText(InputID.SignInEmail, false, '')
        }
      }
    },
    // Password
    {
      id: InputID.SignInPassword,
      model: this.SignInPasswordModel,
      type: 'password',
      label: 'Password',
      detail: {
        detailText: '',
        detailTextColor: 'danger'
      },
      isPassword: true,
      passwordIcon: 'eye',
      modelChanged: () => {
        this.SignInPasswordModel = this.getModelText(InputID.SignInPassword, false);
        this.inputsSignInChange();
      },
      inputBlur: () => {
        const password = this.getModelText(InputID.SignInPassword, false);
        
        if(this.Validation.IsNullOrEmpty(password)) {
          this.setErrorText(InputID.SignInPassword, false, emptyFieldErrorText);
        }
        else {
          this.setErrorText(InputID.SignInPassword, false, '');
        }
      },
      togglePasswordVisibility: () => {
        this.togglePassword(InputID.SignInPassword, false)
      }
    },
  ]
  
  @ViewChild(IonSlides) slides: IonSlides; 
  @ViewChildren(IonInput) inputs: IonInput[];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private userAuth: UserAuthService,
    private customRoute: CustomRouteService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const route = this.router.url;
    if(route == '/' + signInRoute) {
      this.goToSignIn();
      this.OnSignUpPage = false;
    }
    else{
      this.setTabIndex();
    }
    this.slides.lockSwipes(true);
  }

  inputsSignUpChange() {
    if(this.Validation.IsValidEmail(this.SignUpEmailModel) && this.Validation.IsValidPassword(this.SignUpPasswordModel) && 
    this.Validation.ConfirmPasswordMatch(this.SignUpPasswordModel, this.SignUpConfirmPasswordModel)) {
      this.HasSignUpErrors = false;
    }
    else{
      this.HasSignUpErrors = true;
    }
    
  }

  inputsSignInChange() {
    if(this.Validation.IsValidEmail(this.SignInEmailModel) && !this.Validation.IsNullOrEmpty(this.SignInPasswordModel)) {
      this.HasSignInErrors = false;
    }
    else{
      this.HasSignInErrors = true;
    }
  }

  signUp() {
    
    if(this.HasSignUpErrors || this.IsSigningUp) return;

    this.IsSigningUp = true;
    this.userAuth.signup(this.SignUpEmailModel, this.SignUpPasswordModel, this.ReferralCodeModel)
      .subscribe((res) => {
        if(res.statuscode == 99) {
          this.proceedSignUp(res.userdata);
        }
        else if(res.statuscode == 96) {
          this.setErrorText(InputID.SignUpEmail, true, duplicateCredential('email'));
        }
        this.IsSigningUp = false;
      },
      (err) => {
        console.log(err);
        this.checkInternetConnAlert();
        this.IsSigningUp = false;
      })
  }

  async proceedSignUp(data?: IUserData[]) {
    console.log(data as IUserData[]);
    await Storage.set({
      key: 'userdata',
      value: JSON.stringify(data)
    });
    this.customRoute.sendProgressEvent(SignUpProgress.SetProfile);
    this.customRoute.setProgress(SignUpProgress.SetProfile)
      .then(() => {
        this.router.navigate([`${ completeSignUpRoute }`]);
        this.reset();
     });
  }


  async proceedSignIn(data?: IUserData[]) {
    await Storage.set({
      key: 'userdata',
      value: JSON.stringify(data)
    });
    this.reset();
    this.router.navigate([`${ homeRoute }`]);
    // this.showModalAsync(SessionLoginComponent, sessionsLoginModalID);
  }

  goToSignIn() {
    this.slides.lockSwipes(false);
    this.slides.slideNext()
      .then(() => {
        this.slides.lockSwipes(true);
        this.OnSignUpPage = false;
        this.reset(true);
        this.setTabIndex();
      });
  }

  signIn() {
    if(this.HasSignInErrors || this.IsSigningIn) return;

    this.IsSigningIn = true;
    console.log(this.SignInEmailModel, this.SignInPasswordModel)
    this.userAuth.signin(this.SignInEmailModel, this.SignInPasswordModel)
      .subscribe((res) => {
        if(res.statuscode == 99) {
          this.proceedSignIn(res.userdata);
        }
        else if(res.statuscode == 98) {
          const input = this.getInput(InputID.SignInPassword, false);
          input.detail.detailText = '*Invalid sign in credentials';
        }
        this.IsSigningIn = false;
      }, (err) => {
        this.checkInternetConnAlert();
        this.IsSigningIn = false;
      })
  }

  goToSignUp() {
    this.slides.lockSwipes(false)
    this.slides.slidePrev()
      .then(() => {
        this.slides.lockSwipes(true);
        this.OnSignUpPage = true;
        this.reset(false);
        this.setTabIndex();
      });
  }

  async forgotPassword() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordComponent,
      id: forgotPasswordModalID,
    });

    return await modal.present();
  }

  async checkInternetConnAlert() {
    const toast = await this.toastCtrl.create({
      message: internetConnectionError,
      duration: 3000,
      position: 'top',
    });

    return await toast.present();
  }

  reset(signUp?: boolean) {
    if(signUp == undefined) {
      this.SignUpInputs.forEach(input => {
        input.model = '';
        input.detail.detailText = '';
      }) 
      this.SignInInputs.forEach(input => {
        input.model = '';
        input.detail.detailText = '';
      })
      return; 
    }

    if(signUp == true){
      this.SignUpInputs.forEach(input => {
        input.model = '';
        input.detail.detailText = '';
      });
    }
    else{
      this.SignInInputs.forEach(input => {
        input.model = '';
        input.detail.detailText = '';
      })
    }
  }

  wait = (ms) => new Promise<any>(resolve => setTimeout(resolve, ms));

  togglePassword(id: InputID, isSignUp?: boolean, setVisibility?: boolean) {
    if(isSignUp == undefined) isSignUp = true;

    let input: IInputType;
    if(isSignUp == true){
     input = this.SignUpInputs.find(input => {
        return input.id == id;
      });
    }
    else {
      input = this.SignInInputs.find(input => {
        return input.id == id;
      });
    }

    if(setVisibility != null) {
      input.passwordVisible = setVisibility;
      return;
    }

    if(input.passwordVisible == true) {
      input.type = 'password';
      input.passwordIcon = 'eye';
      input.passwordVisible = false;
    }
    else{
      input.type = 'text';
      input.passwordIcon = 'eye-off';
      input.passwordVisible = true;
    }
  }

  setErrorText(id: InputID, isSignUp?: boolean, errorText?: string, errorTextColor?: string) {
    if(!errorText) errorText == '';
    if(!errorTextColor) errorTextColor = 'danger';
    if(isSignUp == undefined) isSignUp = true;


    let input: IInputType;
    
    if(isSignUp){
     input = this.SignUpInputs.find(input => {
        return input.id == id
      });
    }
    else {
      input = this.SignInInputs.find(input => {
        return input.id == id
      });
    }

    input.detail.detailText = errorText;
    input.detail.detailTextColor = errorTextColor;
  }

  getModelText(id: InputID, isSignUp?: boolean) {
    let input: IInputType;
    if(isSignUp == undefined) isSignUp = true;
    
    if(isSignUp){
     input = this.SignUpInputs.find(input => {
        return input.id == id
      });
    }
    else {
      input = this.SignInInputs.find(input => {
        return input.id == id
      });
    }

    return input.model;
  }

  getInput(id: InputID, isSignUp?: boolean) {
    let input: IInputType;
    if(isSignUp == undefined) isSignUp = true;
    
    if(isSignUp){
     input = this.SignUpInputs.find(input => {
        return input.id == id
      });
    }
    else {
      input = this.SignInInputs.find(input => {
        return input.id == id
      });
    }

    return input;
  }

  setTabIndex() {
    this.inputs.forEach(async (input, index) => {
      
      const elem = await input.getInputElement();
      elem.setAttribute('tabindex', '0');
      
      if((this.OnSignUpPage && index > 3)) {
        elem.setAttribute('tabindex', '-1');
      }
      else if((!this.OnSignUpPage && index <= 3)) {
        elem.setAttribute('tabindex', '-1');
      }
    })
  }

  async showModalAsync(component: ComponentRef, id?: string) {
    const modal = await this.modalCtrl.create({
      component, id
    })

    return await modal.present();
  }
}

enum InputID {
  SignUpEmail,
  SignUpPassword,
  SignUpConfirmPassword,
  ReferralCode,
  SignInEmail,
  SignInPassword
}