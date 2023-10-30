"use client";

import { MessageInterface, SendMessageDto } from "@/interfaces/message";
import "@/styles/components/dashboard/task/chat.scss";
import { ApolloClient, gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import toast from "react-hot-toast";
import MessageInput from "./MessageInput";
import MessagesWrapper from "./MessagesWrapper";

const LIST_MESSAGES = gql`
    query ListMessages($data: ListMessageDto!) {
        listMessages(data: $data) {
            id
            content
            voice_note_src
            asset_src
            sender {
                id
                fullname
                avatar
                role
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
            asset_src
            sender {
                id
                fullname
                avatar
                role
            }
            created_at
        }
    }
`;

export default function Chat({
    client,
    task_id,
}: {
    client: ApolloClient<any> | undefined;
    task_id: string;
}) {
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [page, setPage] = useState(1);

    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_MESSAGES, {
        client,
        fetchPolicy: "no-cache",
        variables: {
            data: {
                task_id,
                page,
            },
        },
    });
    const [sendMessage] = useMutation(SEND_MESSAGE, { client });

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (data?.listMessages) {
            setMessages(data?.listMessages);
        }
    }, [graphQLloading, data]);

    const handleSendMessage = async (data: SendMessageDto) => {
        try {
            const res = await sendMessage({
                variables: {
                    data,
                },
            });

            if (res.data?.sendMessage) {
                setMessages((oldMsgs) => [...oldMsgs, res.data.sendMessage]);
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };

    return (
        !graphQLloading &&
        data?.listMessages && (
            <div className="chat basis-1/2 relative flex flex-col rounded-md text-black border-[0.5px] border-gray-600 focus:border-0 mt-[25px] mr-[25px]">
                {messages && (
                    <MessagesWrapper
                        messages={messages}
                        setShowPicker={setShowPicker}
                    />
                )}
                <MessageInput
                    task_id={task_id}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    onMessageSend={handleSendMessage}
                />
            </div>
        )
    );
}
