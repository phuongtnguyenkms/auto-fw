import Env from "@env/env.global";
import { AbstractPage } from "@pages/abstract.page";

export class SignInPage extends AbstractPage {

    elements = {
        usernameInput: () => this.page.getByRole("textbox", { name: "Username" }),
        passwordInput: () => this.page.getByRole("textbox", { name: "Password" }),
        loginButton: () => this.page.getByRole("button", { name: "Login" }),
    };

    async login(username: string, password: string, url: string = Env.WEB_URL) {
        await this.navigateTo(url);
        
        await this.elements.usernameInput().fill(username);
        await this.elements.passwordInput().fill(password);
        await this.elements.loginButton().click();
    }
}