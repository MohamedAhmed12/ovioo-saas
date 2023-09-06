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
import { MouseEvent, useState } from "react";

const MENU_OPTIONS = ["Profile", "Company", "Team"];

export default function AccountPopover() {
    const [open, setOpen] = useState<HTMLElement | null>(null);

    const handleToggle = (event: MouseEvent<HTMLElement> | null) => {
        setOpen(event ? event.currentTarget : null);
    };

    return (
        <>
            <IconButton
                onClick={handleToggle}
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
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
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
                    <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                        My email
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem key={option} onClick={() => handleToggle(null)}>
                            {option}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem onClick={() => handleToggle(null)} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
