import { MessageInterface } from "@/interfaces/message";
import OviooMessage from "./OviooMessage";
import OviooSystemMessage from "./OviooSystemMessage";

export default function MessagesWrapper({
    messages,
}: {
    messages: MessageInterface[];
}) {
    return (
        <div className="messages__wrapper absolute flex flex-col space-y-3 w-full bg-[#fae8bc]">
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
