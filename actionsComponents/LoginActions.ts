import { AuthEndpoint } from '../api/auth/AuthEndpoint';
import { ApiConstants } from '../api/core/ApiConstants';
import { LoginPage } from '../pages/LoginPage';
import { Step } from '../reporting/allure';
import { User } from '../user/User';

export class LoginActions extends LoginPage {
  @Step('Open the staff login page')
  async open(): Promise<void> {
    await this.page.goto(this.login_page_url);
  }

  @Step('Verify mobile number text field is displayed')
  async checkMobileNoTextFieldDisplayed() {
    await this.mobileField.checkIsVisible()
  } 

  @Step('Verify password text field is displayed')
  async checkPasswordTextFieldDisplayed() {
    await this.passwordField.checkIsVisible()
  }

  @Step('Verify login button is displayed')
  async checkLoginButtonDisplayed() {
    await this.loginButton.checkIsVisible()
  }

  @Step('Verify forgot password link is displayed')
  async checkForgotPasswordLinkDisplayed() {
    await this.forgotPasswordLink.checkIsVisible()
  }

  @Step('Enter mobile number "{0}"')
  private async enterMobileNumber(mobileNumber: string) {
    await this.mobileField.clear()
    await this.mobileField.fill(mobileNumber);
  }

  @Step('Enter password')
  private async enterPassword(password: string) {
    await this.passwordField.clear()
    await this.passwordField.fill(password);
  }

  @Step('Click on login button')
  private async clickLoginButton() {
    await this.loginButton.clickAndWaitForResponse((response) =>
      response.url().endsWith(`${ApiConstants.BASE_PATH}${AuthEndpoint.LOGIN}`),
    );
  }

  @Step('Click on login button')
  private async submitLoginForm() {
    await this.loginButton.clickOn();
  }

  @Step('Login to application as {0}')
  async loginToApplication(user: User) {
    await this.enterMobileNumber(user.mobileNumber);
    await this.enterPassword(user.password);
    await this.clickLoginButton();
  }

  @Step('Login as {0} with an invalid password')
  async loginWithInvalidPassword(user: User, invalidPassword: string) {
    await this.enterMobileNumber(user.mobileNumber);
    await this.enterPassword(invalidPassword);
    await this.clickLoginButton();
  }

  @Step('Submit login as {0} with an empty mobile number')
  async loginWithEmptyMobileNumber(user: User) {
    await this.enterPassword(user.password);
    await this.submitLoginForm();
  }

  @Step('Submit login as {0} with an empty password')
  async loginWithEmptyPassword(user: User) {
    await this.enterMobileNumber(user.mobileNumber);
    await this.submitLoginForm();
  }

  @Step('Verify mobile number validation message "{0}" is displayed')
  async checkMobileValidationMessageDisplayed(message: string) {
    await this.mobileValidationMessage.checkIsVisible().checkHasText(message);
  }

  @Step('Verify password validation message "{0}" is displayed')
  async checkPasswordValidationMessageDisplayed(message: string) {
    await this.passwordValidationMessage.checkIsVisible().checkHasText(message);
  }

  @Step('Verify error message "{0}" is displayed')
  async checkErrorMessageDisplayed(message: string) {
    await this.loginErrorMessage.checkIsVisible().checkContainsMessage(message);
  }

  @Step('Verify user stays on the staff login page')
  async checkUserStaysOnLoginPage() {
    await this.loginButton.checkIsEnabled();
  }

}
