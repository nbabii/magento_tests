import { Locator, type Page } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;
  private readonly getAdIframe: Locator
  private readonly getNestedAdIframe: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getAdIframe = page.locator("#aswift_3");
    this.getNestedAdIframe = page.locator("#creative #ad_iframe");
  }

  async handleAdIfPresent() {
    await this.page.addLocatorHandler(this.getAdIframe, async () => {
      if (await this.getNestedAdIframe.isVisible()) {
        await this.getNestedAdIframe.contentFrame().getByRole("button", { name: "Close ad" }).click({ force: true });
        return;
      }
      await this.getAdIframe.contentFrame().getByRole("button", { name: "Close ad" }).click({ force: true });
    });
  }
}
