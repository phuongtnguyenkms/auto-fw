import { Page } from "@playwright/test";
import { Wait } from "@config/timeout.config";

/**
 * `AbstractPage` is the base class for all Page Object Model (POM) pages.
 * It provides common navigation and readiness helpers so page objects
 * can focus on element interactions and page-specific behaviour.
 */
export abstract class AbstractPage {
    constructor(protected readonly page: Page) {}

    /**
     * Navigate to the provided URL and wait for the page to be ready.
     * Tests should call this from page-level helpers when opening pages.
     */
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
        await this.waitForPageReady();
    }

    /**
     * Wait for the page load state. This centralises timeouts for consistency
     * across tests and makes the wait behaviour easy to tune from one place.
     */
    async waitForPageReady(): Promise<void> {
        await this.page.waitForLoadState("load", { timeout: Wait.LONG });
    }
}
