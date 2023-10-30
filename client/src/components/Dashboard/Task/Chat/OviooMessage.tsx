import { useAppSelector } from "@/hooks/redux";
import { MessageInterface } from "@/interfaces/message";
import { MessageBox } from "react-chat-elements";

const OviooMessage = ({ message }: { message: MessageInterface }) => {
    const authUser = useAppSelector((state) => state.userReducer.user);

    return (
        <MessageBox
            id={message.id}
            type={"text"}
            text={message.content || ""}
            position={message.sender?.id == authUser.id ? "right" : "left"}
            title={message.sender?.fullname || ""}
            titleColor="#4f81a1"
            date={message.created_at}
            avatar={message.sender?.avatar}
            removeButton={true}
            replyButton={false}
            forwarded={false}
            focus={true}
            notch={false}
            retracted={false}
            status="waiting"
            styles={{ color: "black" }}
            statusTitle="received"
            className="text-red-700 !inline-block !overflow-visible"
        />
    );
};
export default OviooMessage;
