
import { TaskInterface } from "@/interfaces";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import IconButton from "@mui/joy/IconButton";
import { Badge, Box, Divider, List, Popover, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { TbMessageCircle2Filled } from "react-icons/tb";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import MessageItem from "./MessageItem";

const LIST_TASK_UNREAD_MESSAGES = gql`
    query ListTaskUnreadMessages {
        listTaskUnreadMessages {
            id
            messages {
                id
                content
                status
                created_at
                sender {
                    fullname
                    avatar
                }
            }
            unreadMessagesCount
        }
    }
`;

export default function MessagePopover() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const [allUnreadMsgsCount, setAllUnreadMsgsCount] = useState<number>(0);

    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_TASK_UNREAD_MESSAGES, {
        client,
        fetchPolicy: "no-cache",
    });

    if (error) throw new Error(JSON.stringify(error));

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (data?.listTaskUnreadMessages) {
            const allUnreadMsgsCount = data?.listTaskUnreadMessages.reduce(
                (acc: number, task: TaskInterface) => {
                    if (task.unreadMessagesCount)
                        return acc + task.unreadMessagesCount;
                },
                0
            );

            setAllUnreadMsgsCount(allUnreadMsgsCount);
        }
    }, [data]);

    return (
        !graphQLloading &&
        data.listTaskUnreadMessages && (
            <div className="notifications-popover">
                <IconButton
                    className={` toolbar-icon ${open ? "opened" : "closed"}`}
                    onClick={handleClick}
                >
                    <Badge badgeContent={allUnreadMsgsCount} color="error">
                        <TbMessageCircle2Filled size="26" />
                    </Badge>
                </IconButton>

                <Popover
                    open={Boolean(open)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
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
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                py: 2,
                                px: 2.5,
                                flexGrow: 1,
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle1">
                                    Chats
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                >
                                    You have {allUnreadMsgsCount} unread
                                    messages
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ borderStyle: "dashed" }} />

                        <List disablePadding>
                            {data?.listTaskUnreadMessages.map(
                                (task: TaskInterface) => (
                                    <MessageItem key={+task.id} task={task} />
                                )
                            )}
                        </List>
                    </SimpleBar>
                </Popover>
            </div>
        )
    );
}
