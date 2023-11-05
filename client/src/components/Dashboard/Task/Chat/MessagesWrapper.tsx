import { useAppSelector } from "@/hooks/redux";
import { MessageInterface } from "@/interfaces/message";
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

export default function MessagesWrapper({
    task_id,
    messages,
    setShowPicker,
    fetchMore,
    subscribeToMore,
}: {
    task_id: string;
    messages: MessageInterface[];
    setShowPicker: Dispatch<SetStateAction<boolean>>;
    fetchMore: any;
    subscribeToMore: any;
}) {
    const currentUser = useAppSelector((state) => state.userReducer.user);
    const [chevronUpNumber, setChevronUpNumber] = useState<number>(0);
    const [showChevronUp, setShowChevronUp] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [offsetPlus, setOffsetPlus] = useState<number>(0);
    const msgsWrapper = useRef<HTMLDivElement | null>(null);

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

                return {
                    ...prev,
                    listMessages: [
                        ...fetchMoreResult.listMessages,
                        ...prev.listMessages,
                    ],
                };
            },
        });
    };
    const scrollToBottom = () => {
        if (!msgsWrapper?.current) return;
        msgsWrapper.current.scrollTop = msgsWrapper.current.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();

        const unsubscribe = subscribeToMore({
            document: MESSAGE_SENT,
            variables: { data: { task_id } },
            updateQuery: (
                prev: any,
                { subscriptionData }: { subscriptionData: any }
            ) => {
                if (!subscriptionData?.data?.messageSent) {
                    return prev;
                }

                setOffsetPlus((offsetPlus) => offsetPlus + 1);
                subscriptionData.data.messageSent.sender.id == currentUser.id
                    ? scrollToBottom()
                    : setChevronUpNumber((prev) => prev + 1);

                return {
                    ...prev,
                    listMessages: [
                        ...prev.listMessages,
                        subscriptionData.data.messageSent,
                    ],
                };
            },
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div
            ref={msgsWrapper}
            onScroll={handleOnScroll}
            onClick={() => setShowPicker(false)}
            className="messages__wrapper rounded-t-md flex flex-col space-y-3 w-full bg-[#fae8bc] overflow-auto"
        >
            {messages?.map((message: MessageInterface) =>
                !message.sender ? (
                    <OviooSystemMessage message={message} key={message.id} />
                ) : (
                    <OviooMessage message={message} key={message.id} />
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
