
/**
 * Helper class for validating user input
 */
export class InputValidation {
  public IsNullOrEmpty(...values) {
    // if(!values) return;
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

}