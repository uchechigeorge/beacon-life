
/**
 * Helper class for validating user input
 */
export class InputValidation {
  public IsNullOrEmpty(...values: string[]) {
    let result = values.some((v) => {
      return v.trim() === '' || v === null;
    });

    return result;
  }

  public IsValidUsername(value: string, minLength?: number, maxLength?: number) {
    if(!minLength) minLength = 1;
    if(!maxLength) maxLength = 50;
    return value.trim().length > minLength && value.trim().length < maxLength;
  }

  public ConfirmPasswordMatch(password: string, confirmPassword: string) {
    return password.trim() === confirmPassword.trim();
  }

  public IsValidPassword(password: string, passwordMinLength?: number, passwordMaxLength?: number,) {
    if(!passwordMinLength) passwordMinLength = 5;
    if(!passwordMaxLength) passwordMaxLength = 50;

    return password.trim().length >= passwordMinLength && password.trim().length <= passwordMaxLength;
  }

  public IsGreaterThan(text: string, count: number) {
    return text.trim().length > count;
  }

  public IsLessThan(text: string, count: number) {
    return text.trim().length < count;
  }

  public HasExactly(text: string, count: number) {
    return text.trim().length == count;
  }

  public IsValidEmail(email) {
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(validation.test(email)){
      return true;
    }
    else{
      return false;
    }
  }

  public IsNumber(...values: string[]): boolean {
    let result = values.some(text => {
      return !isNaN(parseFloat(text));
    })

    return result;
  }

  public IsValidAmount(...values: string[]): boolean {
    let result = values.some(text => {
      let number = parseFloat(text);

      return number > 0;
    })

    return result;
  }

  public RemoveWhiteSpace(value: string): string {
    return value.replace(/\s/g, '');
  }

  public MatchRegEx(regEx: RegExp, value: string): boolean {
    return regEx.test(value);
  }
}