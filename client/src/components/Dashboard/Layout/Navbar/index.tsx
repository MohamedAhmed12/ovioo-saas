import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import "@/styles/components/dashboard/layout/navbar.scss";
import Image from 'next/image';
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import NavbarWrapper from "./NavbarWrapper";

const navConfig = [
    {
        title: "Tasks",
        path: "/dashboard/task",
        icon: <ProductionQuantityLimitsIcon />,
    },
    {
        title: "My assets",
        path: "/dashboard/assets",
        icon: <ProductionQuantityLimitsIcon />,
    },
    {
        title: "projects",
        path: "/dashboard/project",
        icon: <ProductionQuantityLimitsIcon />,
    },
    {
        title: "Credit",
        path: "/dashboard/payment",
        icon: <ProductionQuantityLimitsIcon />,
    },
];

export default function Navbar({
    openNav,
    onCloseNav,
}: {
    openNav: boolean;
    onCloseNav: () => void;
}) {
    const renderContent = (
        <SimpleBar className="h-full bg-inherit dark:text-white ">
            <Box className="flex max-h-[100px] px-5 py-6">
                <Image src="/svg/logo.svg" className="hamburger-icon slef-center" width="280" height="66" alt="logo"/>
            </Box>
            <Box>
                <List disablePadding className=" dark:text-white">
                    {navConfig.map(({ title, path, icon }) => (
                        <ListItemButton
                            disableGutters
                            key={title}
                            component="a"
                            className="navItem text-inherit"
                        >
                            <ListItemIcon>{icon && icon}</ListItemIcon>

                            <ListItemText disableTypography primary={title} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
        </SimpleBar>
    );

    return <NavbarWrapper content={renderContent} openNav={openNav} onCloseNav={onCloseNav} />;
}
