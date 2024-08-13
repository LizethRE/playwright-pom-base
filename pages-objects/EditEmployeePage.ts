import {expect, Locator, Page} from "@playwright/test";

export class EditEmployeePage {
    private readonly fullNameLabel: Locator;

    constructor(page: Page) {
        this.fullNameLabel = page.locator("//h6[@class='oxd-text oxd-text--h6 --strong']");
    }

    async checkFullNameText(fullName: string) {
        await expect(this.fullNameLabel).toHaveText(fullName);
    }
}
