import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ModeEnum } from "@/interfaces/store/main";
import { setMode } from "@/store/features/main";
import "@/styles/components/dashboard/layout/header/index.scss";
import { IconButton } from "@mui/joy";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6";
import AccountPopover from "./AccountPopover";
import MessagePopover from "./Message/MessagePopover";
import NotificationPopover from "./Notification/NotificationPopover";

export default function DashboardHeader({
    openNav,
    navbarIsHidden,
    onOpenNav,
}: {
    openNav: boolean;
    navbarIsHidden: boolean;
    onOpenNav: () => void;
}) {
    const mode = useAppSelector((state) => state.mainReducer.mode);
    const dispatch = useAppDispatch();

    return (
        <AppBar
            className="dashboard__header dark:dark-mode"
            position="absolute"
        >
            <Toolbar>
                {navbarIsHidden && (
                    <Image
                        src="/svg/logo.svg"
                        className="hamburger-icon slef-center"
                        width="199"
                        height="52"
                        alt="logo"
                        style={{
                            height: 52,
                            width: 199,
                        }}
                    />
                )}
                {!openNav && (
                    <IconButton
                        onClick={onOpenNav}
                        sx={{
                            mr: 1,
                            color: "text.primary",
                        }}
                        className="hamburger-btn toolbar-icon"
                    >
                        <AiOutlineMenu />
                    </IconButton>
                )}
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{
                        xs: 0.5,
                        sm: 1,
                    }}
                >
                    <IconButton
                        className="mode-toggle-btn toolbar-icon"
                        onClick={() =>
                            dispatch(
                                setMode(
                                    mode === ModeEnum.Dark
                                        ? ModeEnum.Light
                                        : ModeEnum.Dark
                                )
                            )
                        }
                    >
                        {mode === ModeEnum.Dark ? (
                            <FaSun size="22" />
                        ) : (
                            <FaMoon size="22" />
                        )}
                    </IconButton>
                    <MessagePopover />
                    <NotificationPopover />
                    <AccountPopover />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
