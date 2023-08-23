import { Route as RouteInterface } from "@/inerfaces/route";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import { MouseEvent } from "react";

export default function MobileNavBar({
    pages,
    anchorElNav,
    handleToggleNavMenu,
}: {
    pages: RouteInterface[];
    anchorElNav: HTMLElement | null;
    handleToggleNavMenu: (event: MouseEvent<HTMLElement>) => void;
}) {
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        </>
    );
}
