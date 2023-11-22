import { RoleEnum } from "@/interfaces";

export const AllowedRoutes: { [key: string]: string[] } = {
    [RoleEnum.Designer]: ["/dashboard/task", "dashboard/profile"],
};
