import { Route as RouteInterface } from "@/inerfaces/route";
import { AccountCircle } from "@mui/icons-material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import { MouseEvent } from "react";

export default function UserIcon({
    settings,
    anchorElUser,
    handleToggleUserMenu,
}: {
    settings: RouteInterface[];
    anchorElUser: HTMLElement | null;
    handleToggleUserMenu: (event: MouseEvent<HTMLElement> | null) => void;
}) {
    return (
        <div>
            <IconButton
                onClick={handleToggleUserMenu}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                sx={{ p: 0 }}
            >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu
                id="menu-appbar"
                sx={{ mt: "47px", zIndex: 9999 }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleToggleUserMenu(null)}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.title} onClick={() => handleToggleUserMenu(null)}>
                        {setting.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
