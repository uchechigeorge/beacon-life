import { IDetailText, InputID } from './input-models';
import { PageType } from './route-models';

export interface IAppPages{
  title: string,
  url: string,
  icon?: string,
  pageType?: PageType,
}

export interface IHomePageOptions{
  title: string,
  icon?: string,
  iconSrc?: string,
  backGround?: string,
  handler?: () => void | boolean | Promise<void | boolean>,
}

export enum FundOptions{
  ViaUSSD,
  ViaCreditCard,
  ViaBitcoin,
}

export interface IListDetailsOptions{
  title: string,
  subtitle?: string,
  icon?: string,
  iconSrc?: string,
  handler?: () => void
}

export interface ITransactionCard{
  transactionType: string,
  type?: string,
  amount?: number,
  cardHolder?: string,
  date?: string
}

export interface IInputType {
  id: any,
  model: string,
  value?: string,
  label?: string,
  type?: string,
  inputMode?: string,
  pattern?: RegExp,
  detail?: IDetailText,
  isValid?: string,
  tabIndex?: number,
  isPassword?: boolean,
  passwordVisible?: boolean,
  passwordIcon?: string,
  togglePasswordVisibility?,
  inputBlur?: () => void | Promise<void>,
  inputChange?: () => void | Promise<void>,
  onInput?: () => void | Promise<void>,
  modelChanged?: () => void | Promise<void>,
}