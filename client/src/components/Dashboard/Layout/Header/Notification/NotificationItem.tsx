import { Notification as NotificationInterface } from "@/interfaces/notification";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { fToNow } from "@/utils/formatTime";
import {
    Avatar,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { MdAccessTime, MdProductionQuantityLimits } from "react-icons/md";
export default function NotificationItem({
    key,
    notification,
    onClick,
}: {
    key: number;
    notification: NotificationInterface;
    onClick: () => void;
}) {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
            <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.secondary" }}
            >
                &nbsp; {notification.description}
            </Typography>
        </Typography>
    );

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: "1px",
                ...(notification.isUnRead && {
                    bgcolor: "action.selected",
                }),
            }}
            key={key}
            onClick={() => onClick}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: "background.neutral" }}>
                    <MdProductionQuantityLimits />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
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
                        {fToNow(notification.createdAt)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}
