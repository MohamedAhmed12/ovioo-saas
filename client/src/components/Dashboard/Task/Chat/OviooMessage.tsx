import { useAppSelector } from "@/hooks/redux";
import { MessageInterface, MessageStatusEnum } from "@/interfaces/message";
import { isImage, isVideo } from "@/utils/helpers";
import { MessageBox } from "react-chat-elements";
import ReactHtmlParser from "react-html-parser";

const OviooMessage = ({ message }: { message: MessageInterface }) => {
    const authUser = useAppSelector((state) => state.userReducer.user);

    const getType = (): any => {
        if (isVideo(message?.asset)) return "video";
        if (isImage(message?.asset)) return "photo";
        return "text";
    };
    const getMediaDate = () => {
        if (!message?.asset) return {};
        if (isVideo(message.asset) || isImage(message.asset))
            return {
                uri: message.asset.src,
                videoURL: message.asset.src,
                width: 350,
                height: 200,
                status: {
                    click: true,
                    loading: 0.5,
                    download: false,
                },
            };
    };
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
        <MessageBox
            id={message.id}
            text={message.content || ""}
            position={message.sender?.id == authUser.id ? "right" : "left"}
            title={message.sender?.fullname || ""}
            titleColor={"#4f81a1"}
            date={message.created_at}
            avatar={message.sender?.avatar}
            removeButton={true}
            replyButton={false}
            forwarded={false}
            focus={true}
            notch={false}
            retracted={false}
            status={message.status || MessageStatusEnum.WAITING}
            statusTitle={getStatusTitle()}
            type={getType()}
            data={getMediaDate()}
            styles={{ color: "black" }}
            className="text-red-700 !inline-block !overflow-visible"
        />
    );
};
export default OviooMessage;
