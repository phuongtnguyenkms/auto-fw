// import { test } from 'src/fixtures/base.fixture';
import { TestUsers } from "@env/test-users";
import { test } from "@fixtures/ui.fixture";

/**
 * Smoke test: Verify the Sign In page renders correctly.
 * This lightweight check ensures the sign-in form elements are present
 * before running more complex flows.
 */
test("Check 'Sign In' page", async ({ page, signInPage }) => {
    await signInPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);
});