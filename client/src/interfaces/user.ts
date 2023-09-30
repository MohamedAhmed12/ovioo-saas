export enum RoleEnum {
    OWNER = "owner",
    DESIGNER = "designer",
    MEMBER = "member",
}

export enum AuthProviderEnum {
    GOOGLE = "google",
    Facebook = "facebook",
    LinkedIn = "linkedin",
    Credentials = "credentials",
}

export interface User {
    id?: string;
    firstname?: string;
    lastname?: string;
    email: string;
    password?: string;
    company?: string;
    avatar?: string;
    phone?: number;
    role?: RoleEnum;
    created_at?: string;
    updated_at?: string;
}

export interface UserRegister {
    firstname: string;
    lastname: string;
    email: string;
    company?: string;
    password: string;
    password_confirmation?: string;
    phone?: number;
    provider: AuthProviderEnum;
    role?: RoleEnum;
}
