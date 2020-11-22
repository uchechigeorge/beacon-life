import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { testSignupApiRoute, testSetProfileApiRoute, testSetPinApiRoute, 
  testEmailSendingApiRoute, testConfirmEmailApiRoute, testSetProfilePicApiRoute, testsmsApiRoute, testConfirmPhoneNoRoute, testSigninApiRoute } from '../models/api-routes';
import { Observable } from 'rxjs';
import { IUserDataApiResponse } from '../models/api-response-models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, pwd: string, referralid?: string): Observable<IUserDataApiResponse> {
    if(!referralid) referralid = '';

    const data = { email ,pwd, referralid };
    const dataString = JSON.stringify(data);
    return this.http.post(testSignupApiRoute, dataString);
  }

  signin(email: string, pwd: string): Observable<IUserDataApiResponse> {

    const data = { email, pwd };
    const dataString = JSON.stringify(data);
    return this.http.post(testSigninApiRoute, dataString);
  }

  setProfile(userid: string, fname: string, lname: string, phonenum: string, address: string, state: string, country: string, apikey: string): Observable<IUserDataApiResponse> {

    const data = { userid, fname, lname, phonenum, address, state, country, apikey };
    const dataString = JSON.stringify(data);
    return this.http.post(testSetProfileApiRoute, dataString);
  }

  setPin(userid: string, pin: string, apikey: string): Observable<IUserDataApiResponse> {

    const data = { userid, pin, apikey };
    const dataString = JSON.stringify(data);
    return this.http.post(testSetPinApiRoute, dataString);
  }

  sendEmailToken(email: string, token: string, subject?: string, body?: string): Observable<IUserDataApiResponse> {
    if(!subject)  subject = 'Email Verification';
    if(!body) body = `You will need to verify your email before you can start using our digital bank. Your verification code is ${ token }.`;

    return this.http.get(`${ testEmailSendingApiRoute }?email=${ email }&subject=${ subject }&body=${ body }`);
  }

  confirmEmail(userid: string, apikey: string): Observable<IUserDataApiResponse> {
    const data = { userid, apikey };
    const dataString = JSON.stringify(data);

    return this.http.post(testConfirmEmailApiRoute, dataString);
  }

  sendPhoneNumToken(phoneNumber: string, token: string, subject?: string, body?: string): Observable<IUserDataApiResponse> {
    if(!subject)  subject = 'BeaconLife Cash';
    if(!body) body = `You will need to verify your phone number before you can start using our digital bank. Your verification code is ${ token }.`;

    return this.http.get(`${ testsmsApiRoute }?to=${ phoneNumber }&from=${ subject }&body=${ body }`);
  }

  confirmPhoneNo(userid: string, apikey: string): Observable<IUserDataApiResponse> {
    const data = { userid, apikey };
    const dataString = JSON.stringify(data);

    return this.http.post(testConfirmPhoneNoRoute, dataString);
  }

  setProfilePicture(userid: string, apikey: string, formdata: string): Observable<IUserDataApiResponse> {
    return this.http.post(`${ testSetProfilePicApiRoute }?userid=${ userid }&apikey=${ apikey }`, formdata);
  }
}
