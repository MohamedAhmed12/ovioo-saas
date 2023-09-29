import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        access_token: string;
    }
    interface Profile {
        id: string;
    }
    interface User {
        provider_id: string;
    }
}

declare module "next-auth/jwt/types" {
    interface JWT {
        provider_id: string;
    }
}
