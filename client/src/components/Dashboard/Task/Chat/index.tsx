"use client";

import "@/styles/components/dashboard/task/chat.scss";
import { ApolloClient, gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-chat-elements/dist/main.css";
import MessageInput from "./MessageInput";
import MessagesWrapper from "./MessagesWrapper";
const Picker = dynamic(() => import("@emoji-mart/react"));

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
            updated_at
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
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        task_id,
        content: "",
        voice_note_src: null,
        asset_src: null,
    });

    const { error, data } = useQuery(LIST_MESSAGES, {
        client,
        fetchPolicy: "no-cache",
        variables: {
            data: {
                task_id,
                page,
            },
        },
    });

    if (error) throw new Error(JSON.stringify(error));

    return (
        data?.listMessages && (
            <div
                className="chat basis-1/2 relative flex flex-col justify-end text-black border-[0.5px] border-gray-600 focus:border-0 rounded-md mt-[25px] mr-[25px] overflow-y-auto"
                onClick={() => showPicker && setShowPicker(false)}
            >
                <MessagesWrapper messages={data.listMessages} />
                <MessageInput
                    task_id={task_id}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                />
            </div>
        )
    );
}
