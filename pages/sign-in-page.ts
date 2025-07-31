import { BasePage } from '../base/base-page';
import { type Page, type Locator } from '@playwright/test';
import { HeaderComponent } from '../ui-components/header-component';
import { UserInfo } from '../types/main.types';

export class SignInPage extends BasePage {
    readonly getEmailNameInput: Locator;
    readonly getPasswordInput: Locator;
    readonly getSignInBtn: Locator;

    
    constructor(page: Page) {
        super(page);
        this.getEmailNameInput = page.getByRole('textbox', { name: 'Email' });
        this.getPasswordInput = page.getByRole('textbox', { name: 'Password' });
        this.getSignInBtn = page.getByRole('button', { name: 'Sign In' });
    }

    getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
    }
    
    async signInUser(user: UserInfo) {
        await this.getEmailNameInput.fill(user.email);
        await this.getPasswordInput.fill(user.password);
        await this.getSignInBtn.click();
    }
}