import "@/styles/components/dashboard/layout/navbar.scss";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
    MdAttachMoney,
    MdProductionQuantityLimits,
    MdTask,
} from "react-icons/md";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import NavbarWrapper from "./NavbarWrapper";

const navConfig = [
    {
        title: "Tasks",
        url: "/dashboard/task",
        icon: <MdTask size="25" />,
    },
    {
        title: "My assets",
        url: "/dashboard/asset",
        icon: <MdProductionQuantityLimits size="25" />,
    },
    {
        title: "projects",
        url: "/dashboard/project",
        icon: <MdProductionQuantityLimits size="25" />,
    },
    {
        title: "Credit",
        url: "/dashboard/payment",
        icon: <MdAttachMoney size="25" />,
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
                <Image
                    src="/svg/logo.svg"
                    className="hamburger-icon slef-center"
                    width="280"
                    height="66"
                    alt="logo"
                />
            </Box>
            <Box>
                <List disablePadding className=" dark:text-white">
                    {navConfig.map(({ title, url, icon }) => (
                        <Link href={url} key={title}>
                            <ListItemButton
                                disableGutters
                                className="navItem text-inherit"
                            >
                                <ListItemIcon>{icon && icon}</ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    primary={title}
                                />
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
        </SimpleBar>
    );

    return (
        <NavbarWrapper
            content={renderContent}
            openNav={openNav}
            onCloseNav={onCloseNav}
        />
    );
}
