import {expect, Locator, Page} from "@playwright/test";

export class EditEmployeePage {
    private readonly page: Page;
    private readonly fullNameLabel: Locator;
    private readonly firstNameInput: Locator;
    private readonly middleNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly savePersonalDetailsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullNameLabel = page.locator("//h6[@class='oxd-text oxd-text--h6 --strong']");
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.savePersonalDetailsButton = page.locator('form').filter({hasText: 'Employee Full NameEmployee'}).getByRole('button', {name: 'Save'});
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.clear()
        await this.page.waitForTimeout(1000);
        await this.firstNameInput.fill(firstName);
    }

    async fillMiddleName(middleName: string) {
        await this.middleNameInput.clear()
        await this.page.waitForTimeout(1000);
        await this.middleNameInput.fill(middleName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.clear()
        await this.page.waitForTimeout(1000);
        await this.lastNameInput.fill(lastName);
    }

    async clickOnSavePersonalDetails() {
        await this.savePersonalDetailsButton.click();
    }

    async fillOutEditEmployeeForm(firstName: string, middleName: string, lastName: string) {
        await this.fillFirstName(firstName);
        await this.fillMiddleName(middleName);
        await this.fillLastName(lastName);
        await this.clickOnSavePersonalDetails();
    }

    async checkFullNameText(fullName: string) {
        await expect(this.fullNameLabel).toHaveText(fullName);
    }
}
