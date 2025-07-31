import { BasePage } from "../base/base-page";
import { type Locator, type Page } from "@playwright/test";
import { SignInPage } from "../pages/sign-in-page";
import { CreateAccountPage } from "../pages/create-account-page copy";
import { CartPage } from "../pages/cart-page";

export class HeaderComponent extends BasePage {
  readonly getSignInBtn: Locator;
  readonly getCreateAccountBtn: Locator;
  readonly getMenuBtn: Locator;
  readonly getSignOutBtn: Locator;
  readonly getSearchInput: Locator;
  readonly getSearchOptions: Locator;
  readonly getCartBtn: Locator;
  readonly getViewCartBtn: Locator;
  readonly getCartItemCount: Locator;
  readonly getCartLoader: Locator;

  constructor(page: Page) {
    super(page);
    this.getSignInBtn = page.getByRole("link", { name: "Sign In" });
    this.getCreateAccountBtn = page.getByRole("link", {
      name: "Create an Account",
    });
    this.getMenuBtn = page.locator('header [data-action="customer-menu-toggle"]');
    this.getSignOutBtn = page.getByRole("link", { name: "Sign Out" });
    this.getSearchInput = page.locator("header #search");
    this.getSearchOptions = page.locator(".qs-option-name");
    this.getCartBtn = page.locator("a.showcart");
    this.getCartItemCount = page.locator(".counter-number");
    this.getViewCartBtn = page.getByRole("link", {
      name: "View and Edit Cart",
    });
    this.getCartLoader = page.locator(".loading-mask");
  }

  async navigateToSignIn(): Promise<SignInPage> {
    await this.getSignInBtn.click();
    return new SignInPage(this.page);
  }

  async navigateToCreateAccount(): Promise<CreateAccountPage> {
    await this.getCreateAccountBtn.click();
    await this.handleAdIfPresent();
    return new CreateAccountPage(this.page);
  }

  async openMenuAndSignOut() {
    await this.getMenuBtn.click();
    await this.getSignOutBtn.click();
  }

  async searchForProduct(productName: string) {
    await this.getSearchInput.pressSequentially(productName, { delay: 15 });
    await this.getSearchInput.press("Enter");
  }

  async getCartCount(): Promise<string> {
    await this.getCartLoader.waitFor({ state: "visible", timeout: 1000 });
    await this.getCartLoader.waitFor({ state: "hidden", timeout: 5000 });
    await this.getCartItemCount.scrollIntoViewIfNeeded();
    const cartText = await this.getCartItemCount.textContent();
    return cartText ? cartText : "0";
  }

  async navigateToViewCart(): Promise<CartPage> {
    await this.getCartBtn.click();
    await this.getViewCartBtn.click();
    return new CartPage(this.page);
  }
}
