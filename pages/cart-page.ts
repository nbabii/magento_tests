import { BasePage } from "../base/base-page";
import { type Page, type Locator } from "@playwright/test";
import { HeaderComponent } from "../ui-components/header-component";

export class CartPage extends BasePage {
  readonly getCartItem: Locator;

  constructor(page: Page) {
    super(page);
    this.getCartItem = page.locator(".cart.item");
  }

  getHeaderComponent(): HeaderComponent {
    return new HeaderComponent(this.page);
  }

  async removeItemFromCart(itemIndex: number) {
    await this.getCartItem.nth(itemIndex).locator(".action-delete").click();
  }
}
