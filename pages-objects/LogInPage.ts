import {Locator, Page} from "@playwright/test";

export class LogInPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
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
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickOnLogin();
    }
}
