export enum RoleEnum {
    OWNER = "owner",
    DESIGNER = "designer",
    MEMBER= "member"
}

export interface User {
    firstname?: string;
    lastname?: string;
    email: string;
    password?: string;
    avatar?: string;
    role: RoleEnum;
}