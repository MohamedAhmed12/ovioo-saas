import { NotificationInterface } from "@/interfaces/notification";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { fToNow } from "@/utils/formatTime";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { MdAccessTime } from "react-icons/md";
export default function NotificationItem({
    notification,
    onClick,
}: {
    notification: NotificationInterface;
    onClick: () => void;
}) {
    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: "1px",
                ...(!notification.is_read && {
                    bgcolor: "action.selected",
                }),
            }}
            onClick={() => onClick}
        >
            <ListItemText
                primary={
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {notification.content}
                    </Typography>
                }
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            display: "flex",
                            alignItems: "center",
                            color: "text.disabled",
                        }}
                    >
                        <MdAccessTime className="mr-2" />
                        {fToNow(notification.created_at)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}
