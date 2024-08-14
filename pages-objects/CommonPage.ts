import {expect, Locator, Page} from "@playwright/test";

export class CommonPage {
    private readonly page: Page;
    private readonly employeeNameInput: Locator;
    private readonly employeeIdInput: Locator;
    private readonly searchButton: Locator;
    private readonly addButton: Locator;
    private readonly saveButton: Locator;
    private readonly searchResultsLabel: Locator;
    private readonly editButton: Locator;
    private readonly deleteButton: Locator;
    private readonly yesDeleteButton: Locator;
    private readonly toastMessageLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
        this.employeeIdInput = page.getByRole('textbox').nth(2);
        this.searchButton = page.getByRole('button', {name: 'Search'});
        this.addButton = page.getByRole('button', {name: ' Add'});
        this.saveButton = page.getByRole('button', {name: 'Save'});
        this.searchResultsLabel = page.getByText(') Record');
        this.editButton = page.locator(".bi-pencil-fill");
        this.deleteButton = page.locator(".bi-trash");
        this.yesDeleteButton = page.getByRole('button', {name: 'Yes, Delete'});
        this.toastMessageLabel = page.locator(".oxd-text--toast-message");
    }

    async fillEmployeeName(employeeName: string) {
        await this.employeeNameInput.fill(employeeName);
    }

    async fillEmployeeId(employeeId: string) {
        await this.employeeIdInput.fill(employeeId);
    }

    async clickOnSearch() {
        await this.searchButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickOnAdd() {
        await this.addButton.click();
    }

    async clickOnSave() {
        await this.saveButton.click();
    }

    async searchByName(employeeName: string) {
        await this.fillEmployeeName(employeeName);
        await this.clickOnSearch();
    }

    async searchById(employeeId: string) {
        await this.fillEmployeeId(employeeId);
        await this.clickOnSearch();
    }

    async clickOnEdit() {
        await this.editButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickOnDelete() {
        await this.deleteButton.click();
    }

    async clickOnYesDelete() {
        await this.yesDeleteButton.click();
    }

    async deleteAndConfirm() {
        await this.clickOnDelete();
        await this.clickOnYesDelete();
    }

    async checkRecordsFound() {
        await expect(this.searchResultsLabel).toBeVisible();
    }

    async checkToastMessage(message: string) {
        await expect(this.toastMessageLabel).toHaveText(message);
    }
}
