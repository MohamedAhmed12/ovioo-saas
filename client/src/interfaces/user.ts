import { TaskInterface } from "./store/board";
import { Team } from "./team";

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
    fullname?: string;
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
    fullname: string;
    email: string;
    company?: string;
    password: string;
    password_confirmation?: string;
    phone?: number;
    provider: AuthProviderEnum;
    role?: RoleEnum;
}

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
    fullname?: string;
    email: string;
    password?: string;
    company?: string;
    avatar?: string;
    phone?: number;
    role?: RoleEnum;
    created_at?: string;
    updated_at?: string;
}

export interface UserInterface {
    id: string;
    fullname?: string;
    avatar?: string;
    company?: string;
    phone?: number;
    provider?: string;
    profile?: ProfileInteface;
    role?: RoleEnum;
    team?: Team;
    assignedTasks?: TaskInterface[];
}

export interface ProfileInteface {
    id: number;
    company_name?: string;
    company_website?: string;
    business_info?: string;
    target_audience?: string;
    company_links?: string;
    push_notification_enabled: boolean;
    mail_notification_enabled: boolean;
    user?: User;
}
