import { MessageInterface } from "@/interfaces/message";
import { SystemMessage } from "react-chat-elements";

const OviooSystemMessage = ({ message }: { message: MessageInterface }) => {
    return (
        <SystemMessage
            id={message.id}
            type="text"
            text={message.content || ""}
            position="center"
            title=""
            titleColor=""
            date={message.created_at}
            removeButton={true}
            replyButton={false}
            forwarded={false}
            focus={false}
            notch={false}
            retracted={true}
            status="read"
            className="!mt-3 mb-4"
        />
    );
};
export default OviooSystemMessage;
