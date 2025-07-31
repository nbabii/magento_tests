import { BasePage } from '../base/base-page';
import { Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../ui-components/header-component';
import { ItemDetailsPage } from './item-details-page';


export class HomeShopPage extends BasePage {
  readonly getProductItem: Locator;

  constructor(page: Page) {
    super(page);
    this.getProductItem = page.locator('.product-item');
  }

  getHeaderComponent() : HeaderComponent {
    return new HeaderComponent(this.page);
  }

  async open() {
    await this.page.goto('/');
  }

  async clickProductItemByName(productName: string): Promise<ItemDetailsPage> {
    const productItem = this.getProductItem.locator(`a.product-item-link:has-text("${productName}")`);
    await productItem.click();
    return new ItemDetailsPage(this.page);  
  }  
}