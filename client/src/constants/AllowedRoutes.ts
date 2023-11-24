import { RoleEnum } from "@/interfaces";

// allowed routes accourding to role group 
const DesignerAllowedRoutes= ["/dashboard/task", "dashboard/profile"];
const ManagerAllowedRoutes= ["/dashboard/task", "dashboard/profile","dashboard/project"];

export const AllowedRoutes: { [key: string]: string[] } = {
    [RoleEnum.Designer]: DesignerAllowedRoutes,
    [RoleEnum.Agency]: DesignerAllowedRoutes,
    [RoleEnum.AccountManager]: ManagerAllowedRoutes,
    [RoleEnum.Admin]: ManagerAllowedRoutes,
};
