import {Locator, Page} from "@playwright/test";
import {CommonPage} from "./CommonPage";

export class AddEmployeePage {
    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly middleNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly idInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.idInput = page.locator('form').getByRole('textbox').nth(4);
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillMiddleName(middleName: string) {
        await this.middleNameInput.fill(middleName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async getIdEmployee(): Promise<string> {
        return await this.idInput.inputValue()
    }

    async fillOutNewEmployeeForm(firstName: string, middleName: string, lastName: string) {
        await this.fillFirstName(firstName);
        await this.fillMiddleName(middleName);
        await this.fillLastName(lastName);

        const optionsPage = new CommonPage(this.page)
        await optionsPage.clickOnSave();
    }
}
