"use client";

import { useCustomQuery } from "@/hooks/useCustomQuery";
import { SendMessageDto } from "@/interfaces/message";
import "@/styles/components/dashboard/task/chat.scss";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import { useState } from "react";
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
            asset {
                src
                alt
                type
            }
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
            asset {
                src
                alt
                type
            }
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
    const [showPicker, setShowPicker] = useState(false);
    const [sendMessage] = useMutation(SEND_MESSAGE, { client });

    const handleSendMessage = async (sendMessageData: SendMessageDto) => {
        try {
            const res = await sendMessage({
                variables: {
                    data: sendMessageData,
                },
            });

            if (client && res?.data?.sendMessage) {
                client.writeQuery({
                    query: LIST_MESSAGES,
                    variables: {
                        data: { task_id, page: 1 },
                    },
                    data: {
                        ...data,
                        listMessages: data?.listMessages.concat(
                            res.data?.sendMessage
                        ),
                    },
                });
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };

    const {
        loading: graphQLloading,
        error,
        data,
        fetchMore,
    } = useCustomQuery(
        client,
        LIST_MESSAGES,
        { task_id, page: 1 },
        "network-only",
        "network-only"
    );

    if (error) throw new Error(JSON.stringify(error));

    return (
        !graphQLloading &&
        data?.listMessages && (
            <div className="chat basis-1/2 relative flex flex-col rounded-md text-black border-[0.5px] border-gray-600 focus:border-0 mt-[25px] mr-[25px]">
                {data?.listMessages.length > 0 && (
                    <MessagesWrapper
                        task_id={task_id}
                        setShowPicker={setShowPicker}
                        messages={data?.listMessages}
                        fetchMore={fetchMore}
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
