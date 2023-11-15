import { useAppSelector } from "@/hooks/redux";
import { MessageInterface, MessageStatusEnum } from "@/interfaces/message";
import { isImage, isVideo } from "@/utils/helpers";
import { Icon } from "@mui/material";
import { MessageBox } from "react-chat-elements";
import { BsExclamationCircleFill } from "react-icons/bs";

const OviooMessage = ({
    message,
    onResend,
}: {
    message: MessageInterface;
    onResend: () => void;
}) => {
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
        <div
            className={`message-box ${
                authUser.id == message?.sender?.id &&
                "w-full flex justify-end items-center"
            }`}
        >
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
                className={`text-red-700 !inline-block !overflow-visible ${
                    authUser.id == message?.sender?.id && "flex justify-end"
                }`}
            />

            {authUser.id == message?.sender?.id && message.isFailed && (
                <Icon
                    className="ml-2"
                    title="resend"
                    onClick={onResend}
                    baseClassName="cursor-pointer"
                >
                    <BsExclamationCircleFill size="20" color="rgb(185 28 28)" />
                </Icon>
            )}
        </div>
    );
};
export default OviooMessage;
