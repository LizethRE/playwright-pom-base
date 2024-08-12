import {expect, Locator, Page} from "@playwright/test";

export class LogInPage {
    private readonly page: Page;
    private readonly logInPageTitleLabel: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly alertLabel: Locator;
    private readonly requiredFieldAlertLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logInPageTitleLabel = page.getByRole('heading', {name: 'Login'});
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.alertLabel = page.getByText('Invalid credentials');
        this.requiredFieldAlertLabel = page.getByText('Required');
    }

    async goTo() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickOnLogin() {
        await this.loginButton.click();
    }

    async loginWithCredentials(username: string, password: string) {
        if (username.localeCompare("N/a", 'es', {sensitivity: 'base'}) === 0) {
            username = "";
        }
        if (password.localeCompare("N/a", 'es', {sensitivity: 'base'}) === 0) {
            password = "";
        }

        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickOnLogin();
    }

    async checkFailedLoginAlert(message: string) {
        await expect(this.alertLabel).toHaveText(message);
    }

    async checkLogInPageVisibility() {
        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        await expect(this.logInPageTitleLabel).toBeVisible();
    }

    async checkRequiredFieldVisibility() {
        await expect(this.requiredFieldAlertLabel.nth(0) || this.requiredFieldAlertLabel.nth(1)).toBeVisible();
    }
}
