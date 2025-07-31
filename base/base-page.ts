import { type Page } from '@playwright/test';


export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async handleAdIfPresent() {
    await this.page.addLocatorHandler(this.page.locator('#aswift_3'), async () => {
      if (await this.page.locator('#creative #ad_iframe').isVisible()) {
        await this.page.locator('#creative #ad_iframe').contentFrame().getByRole('button', { name: 'Close ad' }).click({ force: true });
        return;
      } 
      await this.page.locator('#aswift_3').contentFrame().getByRole('button', { name: 'Close ad' }).click({ force: true });
    });
  }
}
