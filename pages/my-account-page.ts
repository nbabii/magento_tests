import { BasePage } from '../base/base-page';
import { type Page, type Locator } from '@playwright/test';
import { HeaderComponent } from '../ui-components/header-component';


export class MyAccountPage extends BasePage {
    readonly getContactInfoSection: Locator;

  constructor(page: Page) {
    super(page);
    this.getContactInfoSection = page.locator('.block-dashboard-info .box-content');
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }
  
}