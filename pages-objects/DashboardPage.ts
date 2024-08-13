import {expect, Locator, Page} from "@playwright/test";

export class DashboardPage {
    private readonly page: Page;
    private readonly dashboardModuleTitleLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardModuleTitleLabel = page.getByRole('heading', {name: 'Dashboard'});
    }

    async goTo() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    }

    async checkDashboardPageVisibility() {
        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        await expect(this.dashboardModuleTitleLabel).toBeVisible();
    }
}