import { useAppSelector } from "@/hooks/redux";
import { RoleEnum } from "@/interfaces/user";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MouseEvent, useState } from "react";

const menuOptions = [
    {
        title: "Profile",
        url: "/dashboard/profile",
    },
];
const userMenuOptions = [
    {
        title: "Company",
        url: "/dashboard/company",
    },
    {
        title: "Team",
        url: "/dashboard/team",
    },
];

export default function AccountPopover() {
    const [open, setOpen] = useState<HTMLElement | null>(null);

    const authUser = useAppSelector((state) => state.userReducer.user);

    const handleToggle = (event: MouseEvent<HTMLElement> | null) => {
        setOpen(event ? event.currentTarget : null);
    };
    const getMenuOptions: () => {
        title: string;
        url: string;
    }[] = () => {
        if (![RoleEnum.User, RoleEnum.Member].includes(authUser.role)) {
            return menuOptions;
        }
        return [...menuOptions, ...userMenuOptions];
    };

    return (
        <>
            <IconButton
                onClick={handleToggle}
                style={{ marginLeft: 10 }}
                sx={{
                    p: 0,
                    ...(open && {
                        "&:before": {
                            zIndex: 1,
                            content: "''",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            position: "absolute",
                            bgcolor: (theme) =>
                                alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar
                    alt="Remy Sharp"
                    src="https://i.pravatar.cc/400"
                    sx={{ width: 45, height: 45 }}
                />
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={() => handleToggle(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                    paper: {
                        sx: {
                            p: 0,
                            mt: 1.5,
                            ml: 0.75,
                            width: 180,
                            "& .MuiMenuItem-root": {
                                typography: "body2",
                                borderRadius: 0.75,
                            },
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        My name
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                    >
                        My email
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Stack>
                    {getMenuOptions().map(({ url, title }) => (
                        <Link
                            href={url}
                            key={title}
                            onClick={() => handleToggle(null)}
                        >
                            <MenuItem>{title}</MenuItem>
                        </Link>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
