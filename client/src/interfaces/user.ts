export enum RoleEnum {
    OWNER = "owner",
    DESIGNER = "designer",
    MEMBER = "member",
}

export interface User {
    id?: number;
    firstname?: string;
    lastname?: string;
    email: string;
    password?: string;
    avatar?: string;
    role?: RoleEnum;
    created_at?: string;
    updated_at?: string;
}
