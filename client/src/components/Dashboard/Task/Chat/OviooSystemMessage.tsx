import { MessageInterface, MessageStatusEnum } from "@/interfaces/message";
import { SystemMessage } from "react-chat-elements";

const OviooSystemMessage = ({ message }: { message: MessageInterface }) => {
    const getStatusTitle = () => {
        if (
            message.status == MessageStatusEnum.RECEIVED &&
            message.received_by
        ) {
            return `Received by: ${message.received_by}`;
        }
        if (message.status == MessageStatusEnum.READ) {
            return `Read by: ${message.read_by}`;
        }
        return "";
    };

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
            status={message.status || MessageStatusEnum.WAITING}
            statusTitle={getStatusTitle()}
            className="!mt-3 mb-4"
        />
    );
};
export default OviooSystemMessage;
