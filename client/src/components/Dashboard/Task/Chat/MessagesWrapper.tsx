import { useAppSelector } from "@/hooks/redux";
import { MessageInterface, SendMessageDto } from "@/interfaces/message";
import { gql } from "@apollo/client";
import { Badge, Fab } from "@mui/material";
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
const READ_MESSAGES = gql`
    subscription ReadMessages($data: ReadMessageArgsDto!) {
        readMessages(data: $data) {
            user {
                fullname
            }
        }
    }
`;

export default function MessagesWrapper({
    task_id,
    setShowPicker,
    setMessages,
    messages,
    handleSendMessage,
    fetchMore,
    subscribeToMore,
}: {
    task_id: string;
    setShowPicker: Dispatch<SetStateAction<boolean>>;
    setMessages: Dispatch<SetStateAction<any[]>>;
    messages: any[];
    handleSendMessage: (sendMessageData: SendMessageDto) => void;
    fetchMore: any;
    subscribeToMore: any;
}) {
    const [chevronUpNumber, setChevronUpNumber] = useState<number>(0);
    const [showChevronUp, setShowChevronUp] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [offsetPlus, setOffsetPlus] = useState<number>(0);
    const [lastMessage, setLastMessage] = useState<MessageInterface>();
    const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);
    const msgsWrapper = useRef<HTMLDivElement | null>(null);
    const currentUser = useAppSelector((state) => state.userReducer.user);

    const handleOnScroll = ({ currentTarget }: any) => {
        const showChevron =
            currentTarget.scrollHeight - currentTarget.scrollTop > 800;
        if (!showChevron) setChevronUpNumber(0);
        setShowChevronUp(showChevron);

        if (currentTarget.scrollTop == 0) loadMoreMessagesOnScroll();
    };
    const loadMoreMessagesOnScroll = () => {
        setPage((page) => page + 1);
        fetchMore({
            variables: {
                data: {
                    task_id,
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
                    setPrevScrollHeight(msgsWrapper.current.scrollHeight);
                }
                setMessages((messages) => [
                    ...fetchMoreResult.listMessages,
                    ...messages,
                ]);
            },
        });
    };
    const scrollToBottom = () => {
        if (!msgsWrapper?.current) return;
        msgsWrapper.current.scrollTop = msgsWrapper.current.scrollHeight;
    };
    const handleResend = (message: MessageInterface, index: number) => {
        const { content, voice_note_src, asset } = message;
        messages.splice(index, 1);

        handleSendMessage({ task_id, content, voice_note_src, asset });
    };

    useEffect(() => {
        scrollToBottom();

        const unsubscribeMsgSent = subscribeToMore({
            document: MESSAGE_SENT,
            variables: { data: { task_id } },
            updateQuery: (
                prev: any,
                { subscriptionData }: { subscriptionData: any }
            ) => {
                if (!subscriptionData?.data?.messageSent) {
                    return prev;
                }

                setOffsetPlus((offsetPlus) => offsetPlus + 1); // to prevent fetching msgs already exist
                setMessages((messages) => [
                    ...messages,
                    subscriptionData?.data?.messageSent,
                ]);
            },
        });

        return () => {
            unsubscribeMsgSent();
        };
    }, []);

    useEffect(() => {
        if (messages?.length > 0 && msgsWrapper?.current) {
            if (messages[messages.length - 1] === lastMessage) {
                msgsWrapper.current.scrollTop =
                    msgsWrapper.current.scrollHeight - prevScrollHeight;
            } else {
                messages[messages.length - 1]?.sender?.id == currentUser.id
                    ? scrollToBottom()
                    : setChevronUpNumber((prev) => prev + 1);
            }
        }

        setLastMessage(messages[messages.length - 1]);
    }, [messages]);

    return (
        <div
            ref={msgsWrapper}
            onScroll={handleOnScroll}
            onClick={() => setShowPicker(false)}
            className="messages__wrapper rounded-t-md flex flex-col space-y-3 w-full bg-[#fae8bc] overflow-auto"
        >
            {messages?.map((message: MessageInterface, index: number) =>
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