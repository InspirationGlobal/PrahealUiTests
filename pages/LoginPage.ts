import { Page } from '@playwright/test';
import { BaseElement, Button, ErrorMessage, Input, Link } from '../decorator';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly login_page_url = '/staff-login';

  protected readonly mobileField: Input;
  protected readonly passwordField: Input;
  protected readonly loginButton: Button;
  protected readonly loginErrorMessage: ErrorMessage;
  protected readonly mobileValidationMessage: BaseElement;
  protected readonly passwordValidationMessage: BaseElement;
  protected readonly forgotPasswordLink: Link;

  constructor(page: Page) {
    super(page);
    this.mobileField = this.input('input[placeholder="Mobile No."]');
    this.passwordField = this.input('input[placeholder="Password"]');
    this.loginButton = this.button('button[title="Login"]');
    this.loginErrorMessage = this.errorMessage('div[role="alert"]');
    this.mobileValidationMessage = this.element('label.invalid-input[for="login_mobile"]');
    this.passwordValidationMessage = this.element('label.invalid-input[for="login_password"]');
    this.forgotPasswordLink = this.link('a[href="/staff-forgot-password"]');
  }
}
