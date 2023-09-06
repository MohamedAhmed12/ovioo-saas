import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ModeEnum } from "@/interfaces/store/main";
import { toggleMode } from "@/store/features/main";
import "@/styles/components/dashboard/layout/header/index.scss";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/joy";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./Notification/NotificationsPopover";

export default function DashboardHeader({ onOpenNav }: { onOpenNav: () => void }) {
    const mode = useAppSelector((state) => state.mainReducer.mode);
    const dispatch = useAppDispatch();

    return (
        <AppBar className="dashboard__header dark:dark-mode">
            <Toolbar>
                <IconButton
                    onClick={onOpenNav}
                    sx={{
                        mr: 1,
                        color: "text.primary",
                        display: { lg: "none" },
                    }}
                    className="toolbar-icon"
                >
                    <MenuIcon />
                </IconButton>
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
                        onClick={() => dispatch(toggleMode())}
                    >
                        {mode === ModeEnum.Dark ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <NotificationsPopover />
                    <AccountPopover />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
