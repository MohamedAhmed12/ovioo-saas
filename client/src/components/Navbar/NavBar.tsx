"use client";

import "@/styles/components/navbar.scss";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { MouseEvent, useState } from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { Route as RouteInterface } from "@/inerfaces/route";
import HideOnScroll from '../HideOnScroll';

function ResponsiveAppBar() {
    const pages: RouteInterface[] = [
        { url: "/portfolio", title: "Our Work" },
        { url: "/pricing", title: "Plans" },
        { url: "/how-it-works", title: "How it Works" },
        { url: "/about", title: "About Us" },
        { url: "/login", title: "Log In" },
    ];
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleToggleNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event ? event.currentTarget : null);
    };

    return (
        <HideOnScroll>
            <AppBar
                position="static"
                className="navbar-container flex"
                style={{ backgroundColor: "rgba(44, 43, 70, 0.8)" }}
            >
                <div className="navbar-desktop w-full" style={{ justifyContent: "center" }}>
                    <Toolbar disableGutters className="nav-bar">
                        <Desktop pages={pages} handleToggleNavMenu={handleToggleNavMenu} />
                        <Mobile
                            pages={pages}
                            handleToggleNavMenu={handleToggleNavMenu}
                            anchorElNav={anchorElNav}
                        />
                    </Toolbar>
                </div>
            </AppBar>
        </HideOnScroll>
    );
}
export default ResponsiveAppBar;
