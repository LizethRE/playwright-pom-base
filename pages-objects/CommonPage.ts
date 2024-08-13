import {expect, Locator, Page} from "@playwright/test";

export class CommonPage {
    private readonly addButton: Locator;
    private readonly saveButton: Locator;
    private readonly toastMessageLabel: Locator;

    constructor(page: Page) {
        this.addButton = page.getByRole('button', {name: ' Add'});
        this.saveButton = page.getByRole('button', {name: 'Save'});
        this.toastMessageLabel = page.locator(".oxd-text--toast-message");
    }

    async clickOnAdd() {
        await this.addButton.click();
    }

    async clickOnSave() {
        await this.saveButton.click();
    }

    async checkToastMessage(message: string) {
        //await this.toastMessageLabel.waitFor({ state: 'visible' });
        await expect(this.toastMessageLabel).toHaveText(message);
    }
}
