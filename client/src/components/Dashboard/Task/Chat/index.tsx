import { MessageInterface } from "@/interfaces/message";
import "@/styles/components/dashboard/task/chat.scss";
import { ApolloClient, gql, useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { BiSolidMicrophone } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
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
            <div className="chat basis-1/2 relative flex flex-col justify-end text-black border-[0.5px] border-gray-600 focus:border-0 rounded-md mt-[25px] mr-[25px] overflow-y-auto">
                <div className="absolute flex flex-col space-y-3 w-full bg-orange-300">
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

                <Input
                    value={formData.content || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            content: e.target.value,
                        }))
                    }
                    maxHeight={30}
                    placeholder="Type a message"
                    multiline={true}
                    className="chat__input absolute min-h[62px] max-h-[100px]"
                    leftButtons={
                        <label htmlFor="fileInput">
                            <FaPlus size={20} cursor="pointer" />
                        </label>
                    }
                    rightButtons={
                        formData.content ? (
                            <IoSendSharp
                                size={20}
                                title="send"
                                cursor="pointer"
                            />
                        ) : (
                            <BiSolidMicrophone
                                size={20}
                                title="voice note"
                                cursor="pointer"
                            />
                        )
                    }
                />

                <input
                    type="file"
                    name="fileInput"
                    id="fileInput"
                    className="hidden"
                />
            </div>
        )
    );
}
