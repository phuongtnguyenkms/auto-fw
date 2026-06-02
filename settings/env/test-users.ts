import Env from "@env/env.global";

export type TestUser = {
    username: string;
    password: string;
};

export const TestUsers: Record<"standardUser" | "lockedOutUser", TestUser> = {
    standardUser: {
        username: Env.USERNAME,
        password: Env.PASSWORD,
    },
    lockedOutUser: {
        username: Env.LOCKED_OUT_USERNAME,
        password: Env.LOCKED_OUT_PASSWORD,
    },
};
