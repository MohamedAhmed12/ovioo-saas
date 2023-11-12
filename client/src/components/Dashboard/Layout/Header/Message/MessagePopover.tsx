import { useAppSelector } from "@/hooks/redux";
import { TaskInterface } from "@/interfaces";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery, useSubscription } from "@apollo/client";
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
const MESSAGE_SENT = gql`
    subscription Subscription($data: MessageSentSubscriptionDto!) {
        messageSent(data: $data) {
            id
            content
            voice_note_src
            asset {
                src
                alt
                type
            }
            sender {
                id
                fullname
                avatar
            }
            task {
                id
            }
            created_at
        }
    }
`;

export default function MessagePopover() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const [allUnreadMsgsCount, setAllUnreadMsgsCount] = useState<number>(0);

    const authUser = useAppSelector((state) => state.userReducer.user);
    const openedModalTask = useAppSelector(
        (state) => state.taskReducer.selectedTask
    );
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

    const { data: messageSentSubsData, loading: messageSentSubsLoading } =
        useSubscription(MESSAGE_SENT, {
            variables: {
                data: {
                    team_id: authUser.team.id,
                },
            },
            client,
        });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (
            !messageSentSubsLoading &&
            messageSentSubsData?.messageSent &&
            data?.listTaskUnreadMessages
        ) {
            // if task modal/chat alreay opened then no need to proceed
            if (
                openedModalTask &&
                openedModalTask.id == messageSentSubsData.messageSent.task.id
            )
                return;

            // if task exist in listTaskUnreadMessages
            const taskIndex = data.listTaskUnreadMessages.findIndex(
                (task: Partial<TaskInterface>) =>
                    task.id == messageSentSubsData.messageSent.task.id
            );

            if (taskIndex !== -1) {
                data.listTaskUnreadMessages[taskIndex].messages = [
                    messageSentSubsData.messageSent,
                ];
                data.listTaskUnreadMessages[taskIndex].unreadMessagesCount =
                    data.listTaskUnreadMessages[taskIndex].unreadMessagesCount +
                    1;
                setAllUnreadMsgsCount((prevCount) => prevCount + 1);
            } else {
                data.listTaskUnreadMessages.push({
                    id: messageSentSubsData.messageSent.task.id,
                    messages: [
                        {
                            id: messageSentSubsData.messageSent.id,
                            content: messageSentSubsData.messageSent.content,
                            status: messageSentSubsData.messageSent.status,
                            created_at:
                                messageSentSubsData.messageSent.created_at,
                            sender: {
                                fullname:
                                    messageSentSubsData.messageSent.sender
                                        .fullname,
                                avatar: messageSentSubsData.messageSent.sender
                                    .avatar,
                            },
                        },
                    ],
                    unreadMessagesCount: 1,
                });
                setAllUnreadMsgsCount((prevCount) => prevCount + 1);
            }
        }
    }, [messageSentSubsData, messageSentSubsLoading]);
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
