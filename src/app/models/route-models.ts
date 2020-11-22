export enum PageType{
  Home,
  Cards,
  Transactions,
  Settings
}

export enum SignUpProgress {
  None,
  SetProfile,
  SetPin,
  UploadPicture,
  VerifyEmail,
  VerifyPhoneNumber,
  Complete,
  All = 10
}

export const homeRoute = 'home';
export const cardsRoute = 'cards';
export const transactionsRoute = 'transactions';
export const settingsRoute = 'settings';
export const signInRoute = 'signin';
export const signUpRoute = 'signup';
export const completeSignUpRoute = 'complete-signup';
export const sessionsLoginRoute = 'login';