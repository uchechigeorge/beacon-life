import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

export interface IEditInput{
  id: any,
  model: string,
  value?: string,
  type?: string,
  icon?: string,
  label?: string,
  hasHeader?: boolean,
  headerTitle?: string,
  updateInput?: () => Promise<boolean | void>,
  inputChange?: (e?: any) => void,
  inputBlur?: (e?: any) => void,
}

export interface PasswordStrengthOptions{
  minLength?: number,
  maxLength?: number,
  containNumeric?: boolean,
  containUppercase?: boolean,
}

export interface IDetailText{
  detailText: string,
  detailTextColor?: string,
}


export interface IInsertPinOptions{
  /**
   * Header to display 
   */
  header?: string,
  /**
   * Plain text to display. Use textHTML if HTML code output is desired
   */
  text?: string,
  /**
   * Flag to indicate if output contains HTML code to sanitize. Ideally used for outputing currency html code
   */
  sanitizeString?: boolean,
  /**
   * String to output, and should probably contain HTML code to sanitize. sanitizeString has to be set to true
   */
  textHTML?: SafeHtml,
  /**
   * The event handler
   */
  handler?: () => any | Promise<any> | Observable<any>
}

export const emptyFieldErrorText = '*Fill out this field';

export const noValueSelectedErrorText = '*Select a value';

export const invalidEmailErrorText = '*Provide a valid email';

export const invalidAccountNumberErrorText = '*Provide a valid account number';

export const invalidAmountErrorText = '*Provide a valid amount';

export const invalidNumberErrorText = '*Provide a valid number';

export const invalidInputErrorText = '*Provide a valid value';

export const invalidCardNumberErrorText = '*Provide a valid card number';

export const duplicateCredential = (value: IDupCredentialType) => `${value.slice(0, 1).toUpperCase()}${value.slice(1)} has already been used`;

export const internetConnectionError = 'Check internet connection';

type IDupCredentialType = 'email' | 'phone number';

export const weakPasswordLength = (minLength?: number, maxLength?: number) => {
  if(!minLength) minLength = 5;
  if(!maxLength) maxLength = 50;
  return `Password must be between ${ minLength } to ${ maxLength } characters`;
}

export const fixedPasswordLengthError = (length: number) => {
  if(!length) length = 4;
  return `Pin must be ${ length } digits`;
}

export const confirmPasswordMismatch = '*Confirm password does not match password';

export const confirmPinMismatch = '*Confirm pin does not match pin';

export const optionalField = '(optional)';

export interface ISelectOptions {
  text: string,
  value?: string
}