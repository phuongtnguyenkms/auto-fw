import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Wait } from './settings/config/timeout.config';

const envName = process.env.ENV ?? 'local';
const envPath = path.resolve(__dirname, 'settings', 'env', `.env.${envName}`);
dotenv.config({ path: envPath });

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [["list"], ["html", { open: "never" }]],
    timeout: Wait.EXTRA_LONG,
    expect: {
        timeout: Wait.EXPECT,
    },

    use: {
        baseURL: process.env.WEB_URL,
        headless: !process.env.HEADED,
        trace: "on",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        actionTimeout: Wait.ACTION,
        navigationTimeout: Wait.NAVIGATION,
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
    ],
});
