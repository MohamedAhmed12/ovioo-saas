"use client";

import { Route as RouteInterface } from "@/inerfaces/route";
import { MouseEvent, useEffect, useState } from "react";
import HideOnScroll from "../HideOnScroll";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

function NavBar() {
    const pages: RouteInterface[] = [
        { url: "/portfolio", title: "Our Work" },
        { url: "/pricing", title: "Plans" },
        { url: "/how-it-works", title: "How it Works" },
        { url: "/about", title: "About Us" },
        { url: "/login", title: "Log In" },
    ];
    const settings: RouteInterface[] = [
        { url: "/profile", title: "Profile" },
        { url: "/account", title: "Account" },
        { url: "/dashboard", title: "Dashboard" },
        { url: "/logout", title: "Logout" },
    ];

    const [anchorElNav, setAnchorElNav] = useState<boolean>(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [scrolling, setScrolling] = useState<boolean>(false);

    const handleToggleNavMenu = (val: boolean) => {
        setAnchorElNav(val);
    };
    const handleToggleUserMenu = (event: MouseEvent<HTMLElement> | null) => {
        setAnchorElUser(event ? event.currentTarget : null);
    };

    useEffect(() => {
        const handleScroling = () => {
            window.scrollY > 0 ? setScrolling(true) : setScrolling(false);
        };

        window.addEventListener("scroll", handleScroling);
        return () => {
            window.removeEventListener("scroll", handleScroling);
        };
    }, []);

    return (
        <>
            <Desktop
                pages={pages}
                scrolling={scrolling}
            />
            <Mobile
                pages={pages}
                settings={settings}
                scrolling={scrolling}
                handleToggleNavMenu={handleToggleNavMenu}
                handleToggleUserMenu={handleToggleUserMenu}
                anchorElNav={anchorElNav}
                anchorElUser={anchorElUser}
            />
        </>
    );
}

export default NavBar;
