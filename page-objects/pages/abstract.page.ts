import { Page } from "@playwright/test";
import { Wait } from "@config/timeout.config";

export abstract class AbstractPage {
    constructor(protected readonly page: Page) {}

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
        await this.waitForPageReady();
    }

    async waitForPageReady(): Promise<void> {
        await this.page.waitForLoadState("load", { timeout: Wait.LONG });
    }
}
