import "@/styles/components/navbar/hamburger-btn.scss";

import { Route as RouteInterface } from "@/interfaces";
import { Backdrop, Divider, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { FaArrowRight, FaXmark } from "react-icons/fa6";

export default function HamburgerMenu({
    pages,
    anchorElNav,
    handleToggleNavMenu,
}: {
    pages: RouteInterface[];
    anchorElNav: boolean;
    handleToggleNavMenu: (val: boolean) => void;
}) {
    return (
        <Box className="hamburger-btn block lg:hidden">
            <Tooltip
                title="Open menu"
                onClick={() => handleToggleNavMenu(true)}
            >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <AiOutlineMenu />
                </IconButton>
            </Tooltip>

            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={anchorElNav}
                className="burger-menu justify-start"
            >
                <div className="flex close-btn-container w-full justify-end">
                    <Tooltip
                        title="close menu"
                        onClick={() => handleToggleNavMenu(false)}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <FaXmark />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="menu-container w-full">
                    {pages.map(({ url, title }, index) => (
                        <span key={index}>
                            <Link href={url} className="navlink block">
                                {title}
                            </Link>

                            {index + 1 != pages.length && (
                                <Divider
                                    variant="fullWidth"
                                    component="li"
                                    light={false}
                                    className="list-none list-divider mb-6 mt-6"
                                />
                            )}
                        </span>
                    ))}

                    <div className="book-btn flex w-full mt-40 justify-center border-2 rounded-md">
                        <Link href="/demo" className="navlink block">
                            Book a Demo
                        </Link>
                        <div className="ml-2">
                            <FaArrowRight size="20" />
                        </div>
                    </div>
                </div>
            </Backdrop>
        </Box>
    );
}
