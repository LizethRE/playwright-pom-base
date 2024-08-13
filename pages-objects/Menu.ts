import {Locator, Page} from "@playwright/test";

export class Menu {
    private readonly pimMenuButton: Locator;

    constructor(page: Page) {
        this.pimMenuButton = page.getByRole('link', {name: 'PIM'});
    }

    async navigateToThePimModule() {
        await this.pimMenuButton.click();
    }
}
