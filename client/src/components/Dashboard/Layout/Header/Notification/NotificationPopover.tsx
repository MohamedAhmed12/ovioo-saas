import NotificationItem from "@/components/Dashboard/Layout/Header/Notification/NotificationItem";
import { useAppSelector } from "@/hooks/redux";
import { NotificationInterface } from "@/interfaces";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import IconButton from "@mui/joy/IconButton";
import { Badge, Box, Divider, List, Popover, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import "simplebar-react/dist/simplebar.min.css";

const LIST_NOTIFICATIONS = gql`
    query ListNotifications($data: ListNotificationsDto!) {
        listNotifications(data: $data) {
            id
            content
            action
            is_read
            created_at
            userId
        }
    }
`;
const NOTIFICATION_SENT = gql`
    subscription Subscription($data: NotificationDto!) {
        notificationReceived(data: $data) {
            id
            content
            is_read
            created_at
            userId
            action
        }
    }
`;

export default function NotificationPopover() {
    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );
    const [open, setOpen] = useState<HTMLElement | null>(null);
    const [page, setPage] = useState<number>(1);
    const [offsetPlus, setOffsetPlus] = useState<number>(0);
    const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
    const authUser = useAppSelector((state) => state.userReducer.user);

    const session = useSession();
    const client = getClient(session);
    const {
        loading,
        error,
        data: notificationData,
        fetchMore,
        subscribeToMore,
    } = useQuery(LIST_NOTIFICATIONS, {
        variables: { data: { page } },
        client,
        fetchPolicy: "network-only",
    });

    if (error) throw new Error(JSON.stringify(error));

    const handleOnScroll = ({ currentTarget }: any) => {
        if (
            Math.floor(currentTarget.scrollHeight - currentTarget.scrollTop) ==
            currentTarget.clientHeight
        ) {
            setPage((page) => page + 1);
            fetchMore({
                variables: {
                    data: {
                        page: page + 1,
                        offsetPlus,
                    },
                },
                updateQuery: (
                    prev: any,
                    { fetchMoreResult }: { fetchMoreResult: any }
                ) => {
                    if (
                        !fetchMoreResult ||
                        fetchMoreResult?.listNotifications?.length == 0
                    ) {
                        return;
                    }

                    const newNotifications = [
                        ...notifications,
                        ...fetchMoreResult.listNotifications,
                    ];

                    setNotifications(newNotifications);
                    getNotificationsCount(newNotifications);
                },
            });
        }
    };
    const handleToggle = (event: MouseEvent<HTMLElement> | null) => {
        setOpen(event ? event.currentTarget : null);
    };
    const handleMarkAsRead = (id: number) => {
        setNotifications(
            notifications.map((notification) => {
                if (notification.id == id) {
                    return {
                        ...notification,
                        isUnRead: false,
                    };
                }
                return notification;
            })
        );
    };
    const getNotificationsCount = (notifications: NotificationInterface[]) => {
        const unread = notifications.filter(
            (item: NotificationInterface) => !item.is_read
        );
        setUnreadNotifications(
            (unreadNotification) => unreadNotification + unread.length
        );
    };

    useEffect(() => {
        const unsubscribeNotificationSent = subscribeToMore({
            document: NOTIFICATION_SENT,
            variables: { data: { userId: authUser.id } },
            updateQuery: (
                prev: any,
                { subscriptionData }: { subscriptionData: any }
            ) => {
                if (!subscriptionData?.data?.notificationReceived) {
                    return;
                }

                setOffsetPlus((offsetPlus) => offsetPlus + 1); // to prevent fetching notifications already exist

                setNotifications([
                    subscriptionData.data.notificationReceived,
                    ...prev.listNotifications,
                ]);

                if (!subscriptionData.data.notificationReceived.is_read) {
                    setUnreadNotifications((count) => count + 1);
                }
            },
        });

        return () => {
            unsubscribeNotificationSent();
        };
    }, []);
    useEffect(() => {
        if (notificationData && notifications.length == 0) {
            setNotifications(notificationData.listNotifications);
            getNotificationsCount(notificationData.listNotifications);
        }
    }, [notificationData]);

    return (
        notifications && (
            <div>
                <IconButton
                    className={`notification__icon-button toolbar-icon ${
                        open ? "opened" : "closed"
                    }`}
                    onClick={handleToggle}
                >
                    <Badge badgeContent={unreadNotifications} color="error">
                        <IoNotificationsSharp size="26" />
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
                                overflow: "hidden",
                            },
                            className:
                                "notifications-popover__paper custom-scrollbar",
                            onScroll: handleOnScroll,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 2,
                            px: 2.5,
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">
                                Notifications
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                You have {unreadNotifications} unread messages
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    <List disablePadding>
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onClick={() =>
                                    handleMarkAsRead(notification.id)
                                }
                            />
                        ))}
                    </List>
                </Popover>
            </div>
        )
    );
}
