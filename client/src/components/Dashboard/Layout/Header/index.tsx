import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ModeEnum } from "@/interfaces/store/main";
import { setMode } from "@/store/features/main";
import "@/styles/components/dashboard/layout/header/index.scss";
import { IconButton } from "@mui/joy";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6";
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./Notification/NotificationsPopover";

export default function DashboardHeader({
    openNav,
    onOpenNav,
}: {
    openNav: boolean;
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
                    <NotificationsPopover />
                    <AccountPopover />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
