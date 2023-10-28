import { MessageInterface } from "@/interfaces/message";
import { ApolloClient, gql, useQuery } from "@apollo/client";
import { useState } from "react";
import "react-chat-elements/dist/main.css";
import OviooMessage from "./OviooMessage";
import OviooSystemMessage from "./OviooSystemMessage";

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
    const [page, setPage] = useState(1);
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
            <div className="basis-1/2 relative border-[0.5px] border-gray-600 focus:border-0 rounded-md mt-[25px] mr-[25px] overflow-y-scroll">
                <div className="flex flex-col space-y-3 absolute w-full text-black">
                    {data?.listMessages?.map((message: MessageInterface) =>
                        !message.sender ? (
                            <OviooSystemMessage
                                message={message}
                                key={message.id}
                            />
                        ) : (
                            <OviooMessage message={message} key={message.id} />
                        )
                    )}
                </div>
            </div>
        )
    );
}
