import Env from "@env/env.global";
import { AbstractPage } from "@pages/abstract.page";

/**
 * Page object representing the Sign In page.
 *
 * Usage example in a test fixture:
 *  await signInPage.login(username, password);
 */
export class SignInPage extends AbstractPage {

    // Centralised locators for the Sign In page. Tests and helpers should
    // access interactive elements through these getters to keep selectors
    // in one place and easy to update.
    elements = {
        usernameInput: () => this.page.getByRole("textbox", { name: "Username" }),
        passwordInput: () => this.page.getByRole("textbox", { name: "Password" }),
        loginButton: () => this.page.getByRole("button", { name: "Login" }),
    };

    /**
     * Perform the login flow using the provided credentials.
     * The `url` parameter defaults to the environment `WEB_URL` so tests
     * can override it for different environments if needed.
     */
    async login(username: string, password: string, url: string = Env.WEB_URL) {
        await this.navigateTo(url);

        await this.elements.usernameInput().fill(username);
        await this.elements.passwordInput().fill(password);
        await this.elements.loginButton().click();
    }
}