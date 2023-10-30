import { MessageInterface } from "@/interfaces/message";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import OviooMessage from "./OviooMessage";
import OviooSystemMessage from "./OviooSystemMessage";

export default function MessagesWrapper({
    messages,
    setShowPicker,
}: {
    messages: MessageInterface[];
    setShowPicker: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div
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
        </div>
    );
}
