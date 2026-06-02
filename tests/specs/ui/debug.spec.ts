// import { test } from 'src/fixtures/base.fixture';
import { TestUsers } from "@env/test-users";
import { test } from "@fixtures/ui.fixture";

test("Check 'Sign In' page", async ({ signInPage }) => {
    await signInPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);
});