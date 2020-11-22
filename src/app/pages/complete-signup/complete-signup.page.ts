import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ComponentRef } from "@ionic/core";

import { SignUpProgress, signUpRoute, homeRoute } from 'src/app/models/route-models';
import { SetProfileComponent } from 'src/app/components/signup/set-profile/set-profile.component';
import { CustomRouteService } from 'src/app/services/custom-route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-complete-signup',
  templateUrl: './complete-signup.page.html',
  styleUrls: ['./complete-signup.page.scss'],
})
export class CompleteSignupPage implements OnInit, AfterViewInit {

  @ViewChild(IonSlides) slides: IonSlides;

  public SetProfileValid: boolean = false;
  public SetPinValid: boolean = false;
  public UploadPictureValid: boolean = false;
  public VerifyEmailValid: boolean = false;
  public VerifyPhoneNoValid: boolean = false;

  public ProgressSubscription: Subscription;

  

  constructor(
    public customRoute: CustomRouteService,
    private router: Router,
  ) { 
    this.ProgressSubscription = this.customRoute.getProgressEvent()
      .subscribe((value) => {
        if(value == SignUpProgress.None || value == undefined) {
          this.redirect();
        }
        else{
          this.check(value);
        }
      })
  }

  ngOnInit() {
    this.wait(100)
      .then(() => {
        this.customRoute.check();
          const progress = this.customRoute.ProgressType;
        
          if(progress == SignUpProgress.None || progress == undefined) {
            this.redirect();
          }
          else {
            this.check(progress);
          }
      });
  }

  redirect() {
    this.router.navigate([`${ signUpRoute }`]);
  }

  check(progress?: SignUpProgress) {
    if(!progress) progress = this.customRoute.ProgressType;

    switch (progress) {
      case SignUpProgress.SetProfile:
        this.SetProfileValid = true;
        break;
      case SignUpProgress.SetPin:
        this.SetPinValid = true;
        break;
      case SignUpProgress.UploadPicture:
        this.UploadPictureValid = true;
        break;
      case SignUpProgress.VerifyEmail:
        this.VerifyEmailValid = true;
        break;
      case SignUpProgress.VerifyPhoneNumber:
        this.VerifyPhoneNoValid = true;
        break;
      case SignUpProgress.Complete:
        this.router.navigate([`${ homeRoute }`]);
      default:
        break;
    }
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  setProfile() {
    this.SetPinValid = true;
    this.slideNext(SignUpProgress.SetPin);
  }

  setPin() {
    this.UploadPictureValid = true;
    this.slideNext(SignUpProgress.UploadPicture);
  }

  uploadImage() {
    this.VerifyEmailValid = true;
    this.slideNext(SignUpProgress.VerifyEmail);
  }

  verifyEmail() {
    this.VerifyPhoneNoValid = true;
    this.slideNext(SignUpProgress.VerifyPhoneNumber);
  }

  verifyPhoneNumber() {
    this.slideNext(SignUpProgress.Complete);
    // this.router.navigate([`${ homeRoute }`]);
  }

  wait = (ms: number) => new Promise<any>(resolve => setTimeout(resolve, ms));

  slideNext(progress: SignUpProgress) {
    this.slides.lockSwipes(false);

    this.wait(500)
      .then(() => {
        this.slides.slideTo(progress - 1);

        this.wait(500)
          .then(() => {
            this.customRoute.setProgress(progress);
            this.slides.lockSwipes(true);
            this.check(progress);
          })
      })
  }
}