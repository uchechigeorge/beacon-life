import { IDetailText, ISelectOptions } from './input-models';
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

export interface IListDetailsOptions{
  title: string,
  id?: any,
  subtitle?: string,
  button?: boolean,
  icon?: string,
  iconSrc?: string,
  hasHeader?: boolean,
  toggle?: boolean,
  header?: string,
  showSecondaryIcon?: boolean,
  secondaryIcon?: string,
  handler?: () => void,
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
  type?: InputTypeAttr,
  placeholder?: string,
  icon?: string,
  directive?: InputDirectives,
  labelPosition?: InputLabelPosition,
  inputMode?: InputTypeInpuModes,
  readonly?: boolean,
  pattern?: RegExp,
  fullWidth?: boolean,
  detail?: IDetailText,
  isValid?: string,
  maxLength?: number,
  minLength?: number,
  tabIndex?: number,
  isPassword?: boolean,
  passwordVisible?: boolean,
  passwordIcon?: string,
  togglePasswordVisibility?,
  isSelect?: boolean,
  selectOptions?: ISelectOptions[], 
  inputBlur?: (e?: any) => void | Promise<void>,
  inputChange?: (e?: any) => void | Promise<void>,
  onInput?: (e?: any) => void | Promise<void>,
  modelChanged?: (e?: any) => void | Promise<void>,
}

type InputLabelPosition = 'floating' | 'stacked' | 'fixed';
type InputTypeAttr = 'text' | 'email' | 'number' | 'password';
type InputDirectives = 'card-number' | 'currency' | 'card-expiry-date';
type InputTypeInpuModes = "decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url" | undefined;

interface ICurrencyOption{
  text: string,
  html?: string,
}

interface ICurrencyOptions{
  dollar: ICurrencyOption,
  naira: ICurrencyOption,
  pound?: ICurrencyOption,
  euro?: ICurrencyOption,
}


export const CurrencyOptions: ICurrencyOptions = {
  dollar : {
    text: 'dollar',
    html: '&#65284;'
  },
  naira: {
    text: 'naira',
    html: '&#8358;'
  },
  euro: {
    text: 'euro',
    html: '&#8364;'
  },
  pound: {
    text: 'pound',
    html: '&#163;'
  }
}
