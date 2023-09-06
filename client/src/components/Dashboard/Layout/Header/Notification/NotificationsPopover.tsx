import NotificationItem from "@/components/Dashboard/Layout/Header/Notification/NotificationItem";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/joy/IconButton";
import {
    Badge,
    Box,
    Button,
    Divider,
    List,
    ListSubheader,
    Popover,
    Tooltip,
    Typography,
} from "@mui/material";
import { set, sub } from "date-fns";
import { MouseEvent, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const NOTIFICATIONS = [
    {
        id: 1,
        title: "Your order is placed",
        description: "waiting for shipping",
        avatar: null,
        type: "order_placed",
        createdAt: set(new Date(), { hours: 10, minutes: 30 }),
        isUnRead: true,
    },
    {
        id: 2,
        title: "user 2",
        description: "answered to your comment on the Minimal",
        avatar: "/assets/images/avatars/avatar_2.jpg",
        type: "friend_interactive",
        createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
        isUnRead: true,
    },
    {
        id: 3,
        title: "You have new message",
        description: "5 unread messages",
        avatar: null,
        type: "chat_message",
        createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
        isUnRead: false,
    },
    {
        id: 4,
        title: "You have new mail",
        description: "sent from Guido Padberg",
        avatar: null,
        type: "mail",
        createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
        isUnRead: false,
    },
    {
        id: 5,
        title: "Delivery processing",
        description: "Your order is being shipped",
        avatar: null,
        type: "order_shipped",
        createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
        isUnRead: false,
    },
];

export default function NotificationsPopover() {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const totalUnRead = notifications.filter((item: any) => item.isUnRead === true).length;

    const [open, setOpen] = useState<HTMLElement | null>(null);

    const handleToggle = (event: MouseEvent<HTMLElement> | null) => {
        setOpen(event ? event.currentTarget : null);
    };

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                isUnRead: false,
            }))
        );
    };

    return (
        <div className="notifications-popover">
            <IconButton
                className={`notification__icon-button toolbar-icon ${open ? "opened" : "closed"}`}
                onClick={handleToggle}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <NotificationsIcon sx={{ width: 30, height: 30 }} />
                </Badge>
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
                            mt: 1.5,
                            ml: 0.75,
                            width: 360,
                        },
                    },
                }}
            >
                <SimpleBar style={{ maxHeight: 300 }}>
                    <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">Notifications</Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                You have {totalUnRead} unread messages
                            </Typography>
                        </Box>

                        {totalUnRead > 0 && (
                            <Tooltip title=" Mark all as read">
                                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                                    <DoneAllIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <List
                        disablePadding
                        subheader={
                            <ListSubheader
                                disableSticky
                                sx={{ py: 1, px: 2.5, typography: "overline" }}
                            >
                                New
                            </ListSubheader>
                        }
                    >
                        {notifications.slice(0, 2).map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </List>

                    <List
                        disablePadding
                        subheader={
                            <ListSubheader
                                disableSticky
                                sx={{ py: 1, px: 2.5, typography: "overline" }}
                            >
                                Before that
                            </ListSubheader>
                        }
                    >
                        {notifications.slice(2, 5).map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </List>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <Box sx={{ p: 1 }}>
                        <Button fullWidth disableRipple>
                            View All
                        </Button>
                    </Box>
                </SimpleBar>
            </Popover>
        </div>
    );
}
