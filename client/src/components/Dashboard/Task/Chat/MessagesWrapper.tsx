import { useAppSelector } from "@/hooks/redux";
import { TaskInterface } from "@/interfaces";
import { MessageInterface, MessageStatusEnum } from "@/interfaces/message";
import { getClient } from "@/utils/getClient";
import { gql, useSubscription } from "@apollo/client";
import { Badge, Fab } from "@mui/material";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import OviooMessage from "./OviooMessage";
import OviooSystemMessage from "./OviooSystemMessage";

const MESSAGE_SENT = gql`
    subscription Subscription($data: MessageSentSubscriptionDto!) {
        messageSent(data: $data) {
            id
            content
            voice_note_src
            status
            received_by
            read_by
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
            created_at
        }
    }
`;
const TASK_MSGS_STATUS_CHANGED = gql`
    subscription taskMsgsStatusChanged($teamId: String!) {
        taskMsgsStatusChanged(teamId: $teamId) {
            fullname
            status
        }
    }
`;

export default function MessagesWrapper({
    task,
    setShowPicker,
    setMessages,
    messages,
    handleSendMessage,
    fetchMore,
    subscribeToMore,
    readTaskMessages,
}: {
    task: TaskInterface;
    setShowPicker: Dispatch<SetStateAction<boolean>>;
    setMessages: Dispatch<SetStateAction<any[]>>;
    messages: any[];
    handleSendMessage: (sendMessageData: Partial<MessageInterface>) => void;
    fetchMore: any;
    subscribeToMore: any;
    readTaskMessages: any;
}) {
    const [chevronUpNumber, setChevronUpNumber] = useState<number>(0);
    const [showChevronUp, setShowChevronUp] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [offsetPlus, setOffsetPlus] = useState<number>(0);
    const [lastMessage, setLastMessage] = useState<MessageInterface>();
    const [prevScrollTop, setPrevScrollTop] = useState<number>(0);
    const msgsWrapper = useRef<HTMLDivElement | null>(null);
    const unreadMsgsWrapper = useRef<HTMLDivElement | null>(null);
    const authUser = useAppSelector((state) => state.userReducer.user);

    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const {
        data: msgsStatusChangedSubsData,
        loading: msgsStatusChangedSubsLoading,
    } = useSubscription(TASK_MSGS_STATUS_CHANGED, {
        variables: {
            teamId: task.team?.id,
        },
        client,
    });

    const handleOnScroll = ({ currentTarget }: any) => {
        const showChevron = currentTarget.scrollTop < -100;
        if (!showChevron) setChevronUpNumber(0);
        setShowChevronUp(showChevron);

        if (
            Math.floor(
                currentTarget.scrollHeight -
                    currentTarget.clientHeight +
                    currentTarget.scrollTop
            ) == 0
        )
            loadMoreMessagesOnScroll();
    };
    const loadMoreMessagesOnScroll = () => {
        setPage((page) => page + 1);
        fetchMore({
            variables: {
                data: {
                    task_id: task.id,
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
                    fetchMoreResult.listMessages.length == 0
                ) {
                    return prev;
                }

                if (msgsWrapper?.current) {
                    setPrevScrollTop(msgsWrapper.current.scrollTop);
                }
                setMessages((messages) => [
                    ...messages,
                    ...fetchMoreResult.listMessages,
                ]);
            },
        });
    };
    const scrollToBottom = () => {
        if (!msgsWrapper?.current) return;
        msgsWrapper.current.scrollTop = 0;
    };
    const handleResend = (message: MessageInterface, indexToRemove: number) => {
        const { content, voice_note_src, asset } = message;
        const newMessages = messages;
        newMessages.splice(indexToRemove, 1);
        setMessages((messages) => newMessages);
        handleSendMessage({ task_id: task.id, content, voice_note_src, asset });
    };
    const changeAllMsgsStatus = ({
        fullname,
        status,
    }: {
        fullname: string;
        status: MessageStatusEnum;
    }) => {
        setMessages((messages) =>
            messages.map((msg) => {
                // return in received messages status
                if (msg.sender.id != authUser.id) {
                    return msg;
                }
                if (
                    status == MessageStatusEnum.RECEIVED &&
                    msg.status == MessageStatusEnum.READ
                ) {
                    return msg;
                }
                if (status == MessageStatusEnum.READ) {
                    if (
                        msg.status == MessageStatusEnum.READ &&
                        msg.read_by.includes(` ${fullname}`)
                    ) {
                        return msg;
                    }

                    return {
                        ...msg,
                        status,
                        read_by:
                            msg?.read_by.length > 0
                                ? msg.read_by?.push(` ${fullname}`)
                                : [` ${fullname}`],
                    };
                }
                if (status == MessageStatusEnum.RECEIVED) {
                    if (
                        msg.status == MessageStatusEnum.RECEIVED &&
                        msg.received_by.includes(` ${fullname}`)
                    ) {
                        return msg;
                    }

                    return {
                        ...msg,
                        status,
                        received_by:
                            msg?.received_by.length > 0
                                ? msg.received_by?.push(` ${fullname}`)
                                : [` ${fullname}`],
                    };
                }
            })
        );
    };

    useEffect(() => {
        const unsubscribeMsgSent = subscribeToMore({
            document: MESSAGE_SENT,
            variables: { data: { task_id: task.id } },
            updateQuery: (
                prev: any,
                { subscriptionData }: { subscriptionData: any }
            ) => {
                if (!subscriptionData?.data?.messageSent) {
                    return prev;
                }

                setOffsetPlus((offsetPlus) => offsetPlus + 1); // to prevent fetching msgs already exist
                setMessages((messages) => [
                    subscriptionData?.data?.messageSent,
                    ...messages,
                ]);
                readTaskMessages({ variables: { taskId: task.id } });
            },
        });

        return () => {
            unsubscribeMsgSent();
        };
    }, []);
    useEffect(() => {
        if (messages?.length > 0 && msgsWrapper?.current) {
            // behavior upon loading more msgs or send a message (mostly scrolling behavior)
            if (messages[0] === lastMessage) {
                msgsWrapper.current.scrollTo({ top: prevScrollTop });
            } else {
                messages[0]?.sender?.id == authUser.id
                    ? scrollToBottom()
                    : setChevronUpNumber((prev) => prev + 1);
            }
        }

        setLastMessage(messages[0]);
    }, [messages]);
    useEffect(() => {
        if (msgsStatusChangedSubsData?.taskMsgsStatusChanged) {
            changeAllMsgsStatus(
                msgsStatusChangedSubsData.taskMsgsStatusChanged
            );
        }
    }, [msgsStatusChangedSubsData]);

    return (
        <div
            ref={msgsWrapper}
            onScroll={handleOnScroll}
            onClick={() => setShowPicker(false)}
            className="messages__wrapper rounded-t-md flex flex-col-reverse space-y-3 w-full bg-[#fae8bc] overflow-auto"
        >
            {messages &&
                messages?.map((message: MessageInterface, index: number) =>
                    message?.sender ? (
                        <OviooMessage
                            message={message}
                            key={index}
                            onResend={() => handleResend(message, index)}
                        />
                    ) : (
                        <OviooSystemMessage message={message} key={index} />
                    )
                )}

            {showChevronUp && (
                <Badge
                    badgeContent={chevronUpNumber}
                    className="chat-chevron-up"
                >
                    <Fab size={"small"} onClick={scrollToBottom}>
                        <FaChevronDown color="white" />
                    </Fab>
                </Badge>
            )}
        </div>
    );
}
