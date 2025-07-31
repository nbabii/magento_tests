import { BasePage } from "../base/base-page";
import { type Page, type Locator } from "@playwright/test";
import { HeaderComponent } from "../ui-components/header-component";
import { ProductInfo, UserInfo } from "../types/main.types";

export class ItemDetailsPage extends BasePage {
  readonly getProductTitle: Locator;
  readonly getAddToCartBtn: Locator;
  readonly getSizeSelector: Locator;
  readonly getColorSelector: Locator;

  constructor(page: Page) {
    super(page);
    this.getProductTitle = page.locator(".product-info-main h1");
    this.getAddToCartBtn = page.getByRole("button", {
      name: "Add to Cart",
    });
    this.getSizeSelector = page.locator(".swatch-option.text");
    this.getColorSelector = page.locator(".swatch-option.color");
  }

  getHeaderComponent(): HeaderComponent {
    return new HeaderComponent(this.page);
  }

  async addItemToCart(product: ProductInfo) {
    await this.getSizeSelector.filter({ hasText: product.size }).click();
    await this.page.locator(`[option-label="${product.color}"]`).click();

    await this.getAddToCartBtn.click();
  }
}
