"use client";

import { useAppSelector } from "@/hooks/redux";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { TaskInterface } from "@/interfaces";
import {
    MessageInterface,
    MessageStatusEnum,
    SendMessageDto,
} from "@/interfaces/message";
import "@/styles/components/dashboard/task/chat.scss";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import MessageInput from "./MessageInput";
import MessagesWrapper from "./MessagesWrapper";

const LIST_MESSAGES = gql`
    query ListMessages($data: ListMessageDto!) {
        listMessages(data: $data) {
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
const SEND_MESSAGE = gql`
    mutation sendMessage($data: SendMessageDto!) {
        sendMessage(data: $data) {
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
const READ_MESSAGES = gql`
    mutation ReceiveAllSentMessages($taskId: String!) {
        readTaskMessages(taskId: $taskId)
    }
`;

export default function Chat({
    client,
    task,
}: {
    client: ApolloClient<any> | undefined;
    task: TaskInterface;
}) {
    const currentUser = useAppSelector((state) => state.userReducer.user);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [messages, setMessages] = useState<any[]>([]);

    const [sendMessage] = useMutation(SEND_MESSAGE, { client });
    const [readTaskMessages] = useMutation(READ_MESSAGES, { client });
    const {
        loading: graphQLloading,
        error,
        data,
        fetchMore,
        subscribeToMore,
    } = useCustomQuery(
        client,
        LIST_MESSAGES,
        { task_id: task.id, page: 1 },
        "network-only",
        "network-only"
    );

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (data?.listMessages && data?.listMessages?.length > 0) {
            setMessages(data.listMessages);
            readTaskMessages({ variables: { taskId: task.id } });
        }
    }, [data]);

    const handleSendMessage = async (
        sendMessageData: Partial<MessageInterface>
    ) => {
        const { sender, created_at, isFailed, ...msg } = sendMessageData;

        try {
            // // send message
            const { data } = await sendMessage({
                variables: {
                    data: msg,
                },
            });
        } catch (e: any) {
            const { id, avatar, fullname } = currentUser;
            const newMessage = {
                ...sendMessageData,
                sender: { id, avatar, fullname },
                created_at: Date(),
            };
            newMessage.isFailed = true;

            setMessages((message) => [...message, newMessage]);
        }
    };

    return (
        !graphQLloading &&
        data?.listMessages &&
        messages && (
            <div className="chat basis-1/2 relative flex flex-col rounded-md text-black border-[0.5px] border-gray-600 focus:border-0 mt-[25px] mr-[25px]">
                <MessagesWrapper
                    task={task}
                    setShowPicker={setShowPicker}
                    setMessages={setMessages}
                    messages={messages}
                    handleSendMessage={handleSendMessage}
                    fetchMore={fetchMore}
                    subscribeToMore={subscribeToMore}
                    readTaskMessages={readTaskMessages}
                />
                <MessageInput
                    task_id={task.id}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    onMessageSend={handleSendMessage}
                />
            </div>
        )
    );
}
