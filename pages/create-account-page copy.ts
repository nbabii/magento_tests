import { BasePage } from '../base/base-page';
import { type Page, type Locator } from '@playwright/test';
import { HeaderComponent } from '../ui-components/header-component';
import { UserInfo } from '../types/main.types';
import { MyAccountPage } from './my-account-page';

export class CreateAccountPage extends BasePage {
    readonly getFirstNameInput: Locator;
    readonly getLastNameInput: Locator;
    readonly getEmailInput: Locator;
    readonly getPasswordInput: Locator;
    readonly getConfirmPasswordInput: Locator;
    readonly getCreateAccountBtn: Locator;

    
    constructor(page: Page) {
        super(page);
        this.getFirstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.getLastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.getEmailInput = page.getByRole('textbox', { name: 'Email' });
        this.getPasswordInput = page.getByRole('textbox', { name: 'Password*', exact: true  });
        this.getConfirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
        this.getCreateAccountBtn = page.getByRole('button', { name: 'Create an Account' });
    }

    getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
    }
    
    async fillSignUpForm(user: UserInfo) {
        await this.getFirstNameInput.fill(user.firstName);
        await this.getLastNameInput.fill(user.lastName);
        await this.getEmailInput.fill(user.email);
        await this.getPasswordInput.fill(user.password);
        await this.getConfirmPasswordInput.fill(user.password);
    }

    async submitSignUpForm(): Promise<MyAccountPage>  {
        await this.getCreateAccountBtn.click();
        return new MyAccountPage(this.page);
    }
}