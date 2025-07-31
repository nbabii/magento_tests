import Chance from "chance";
const chance = new Chance();

import { test, expect } from "@playwright/test";
import { HomeShopPage } from "../pages/home-page";
import { UserInfo, ProductInfo } from "../types/main.types";

test.describe("E2E: User flows", () => {
  const product: ProductInfo = {
    name: "Hero Hoodie",
    size: "M",
    color: "Gray",
  };

  let newUserInfo: UserInfo = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: "passworD!1",
  };

  let existedUserInfo: UserInfo = {
    firstName: "Nazar",
    lastName: "Test",
    email: "ntest@test.com",
    password: "passworD!1",
  };

  test("should allow user to crate new account using valid credentials", async ({ page }) => {
    const mainShopPage = new HomeShopPage(page);
    await mainShopPage.open();
    const createAccountPage = await mainShopPage.getHeaderComponent().navigateToCreateAccount();
    await createAccountPage.fillSignUpForm(newUserInfo);
    const myAccountPage = await createAccountPage.submitSignUpForm();

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com/customer/account/");
    await expect(myAccountPage.getContactInfoSection).toContainText(newUserInfo.firstName);
    await expect(myAccountPage.getContactInfoSection).toContainText(newUserInfo.lastName);
    await expect(myAccountPage.getContactInfoSection).toContainText(newUserInfo.email);
  });

  test("should allow user to sign in and sign out using valid credentials", async ({ page }) => {
    const mainShopPage = new HomeShopPage(page);
    await mainShopPage.open();
    const signInPage = await mainShopPage.getHeaderComponent().navigateToSignIn();
    await signInPage.signInUser(existedUserInfo);

    await expect(page).toHaveURL("https://magento.softwaretestingboard.com");
    await expect(mainShopPage.getHeaderComponent().getSignInBtn).toBeHidden();
    await expect(mainShopPage.getHeaderComponent().getCreateAccountBtn).toBeHidden();

    await mainShopPage.getHeaderComponent().openMenuAndSignOut();
    await expect(mainShopPage.getHeaderComponent().getSignInBtn).toBeVisible();
    await expect(mainShopPage.getHeaderComponent().getCreateAccountBtn).toBeVisible();
  });

  test("should allow user to sign in and search for product, add and remove it from cart", async ({ page }) => {
    const mainShopPage = new HomeShopPage(page);
    await mainShopPage.open();
    const signInPage = await mainShopPage.getHeaderComponent().navigateToSignIn();
    await signInPage.signInUser(existedUserInfo);

    await mainShopPage.getHeaderComponent().searchForProduct(product.name);
    const itemDetailsPage = await mainShopPage.clickProductItemByName(product.name);
    await expect(itemDetailsPage.getProductTitle).toContainText(product.name);
    await itemDetailsPage.addItemToCart(product);
    let cartCount = await mainShopPage.getHeaderComponent().getCartCount();

    expect(cartCount).toBe("1");

    let cartPage = await mainShopPage.getHeaderComponent().navigateToViewCart();

    await expect(cartPage.getCartItem).toHaveCount(1);

    await cartPage.removeItemFromCart(0);

    await expect(cartPage.getCartItem).toHaveCount(0);
  });
});
