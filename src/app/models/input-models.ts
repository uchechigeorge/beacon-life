export enum InputID{
  SignUpEmail,
  SignUpPassword,
  SignUpConfirmPassword,
  ReferralCode,
  SignInEmail,
  SignInPassword,
  USSDTransferBank,
  USSDTransferAmount,
  CreditCardTransferAmount,
  BitcoinTransferAmount,
}
export enum EditInputID{
  FirstName, 
  LastName,
  StreetAddress,
  City,
  PhoneNumber,
}

export interface IEditInput{
  id: EditInputID,
  model: string,
  value?: string,
  type?: string,
  icon?: string,
  label?: string,
  hasHeader?: boolean,
  headerTitle?: string,
  updateInput?: () => Promise<boolean>,
  inputChange?: () => void,
  inputBlur?: () => void,
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

export const emptyFieldErrorText = '*Fill out this field';

export const noValueSelectedErrorText = '*Select a value';

export const invalidEmailErrorText = '*Provide a valid email';

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