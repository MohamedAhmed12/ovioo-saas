import "@/styles/components/navbar/navbar-desktop.scss";

import { Route as RouteInterface } from "@/inerfaces/route";
import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import HideOnScroll from "../HideOnScroll";
import BookDemoBtn from "./BookDemoBtn";

export default function Desktop({
    pages,
    scrolling,
}: {
    pages: RouteInterface[];
    scrolling: boolean;
}) {
    return (
        <HideOnScroll>
            <AppBar
                className={`navbar-container justify-center ${scrolling ? "navbar-blur" : ""}`}
                style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    position: "sticky",
                }}
            >
                <Toolbar disableGutters className="w-full justify-center h-full">
                    <div className="navbar-desktop-bg w-full h-full justify-center items-center flex">
                        <div className="navbar-desktop hidden lg:flex">
                            <a href="/" aria-current="page" className="h-full max-w-full">
                                <div className="navbar_logo flex">
                                    <img src="/svg/logo.svg" className="slef-center" />
                                </div>
                            </a>
                            <Box
                                sx={{ display: { xs: "none", md: "flex" } }}
                                className="self-center"
                            >
                                <div className="menu">
                                    {pages.map(({ url, title }) => (
                                        <Link
                                            key={title}
                                            href={url}
                                            className="navlink-2 bottom-gradient inline-block"
                                        >
                                            {title}
                                        </Link>
                                    ))}
                                </div>
                                <BookDemoBtn />
                            </Box>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}
