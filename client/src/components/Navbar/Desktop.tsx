import "@/styles/components/navbar-desktop.scss";

import Box from "@mui/material/Box";
import { MouseEvent } from "react";
import Link from "next/link";
import { Route as RouteInterface } from "@/inerfaces/route";
import BookDemoBtn from './BookDemoBtn';

export default function Desktop({
    pages,
    handleToggleNavMenu,
}: {
    pages: RouteInterface[];
    handleToggleNavMenu: (event: MouseEvent<HTMLElement>) => void;
}) {
    return (
        <>
            <a href="/" aria-current="page" className="h-full max-w-full inline-flex">
                <div className="navbar_logo flex">
                    <img src="/svg/logo.svg" className="slef-center" />
                </div>
            </a>
            <Box sx={{ display: { xs: "none", md: "flex" } }} className="self-center">
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
                <BookDemoBtn/>
            </Box>
        </>
    );
}
