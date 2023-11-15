import { MessageInterface, SendMessageDto } from "@/interfaces/message";
import { getClient } from "@/utils/getClient";
import { uploadFiles } from "@/utils/helpers";
import emojiData from "@emoji-mart/data";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    useRef,
    useState,
} from "react";
import { Input } from "react-chat-elements";
import toast from "react-hot-toast";
import { BiSolidMicrophone } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
const Picker = dynamic(() => import("@emoji-mart/react"));

const iconSize = 22;

export default function MessageInput({
    task_id,
    showPicker,
    setShowPicker,
    onMessageSend,
}: {
    task_id: string;
    showPicker: boolean;
    setShowPicker: Dispatch<SetStateAction<boolean>>;
    onMessageSend: (formData: Partial<MessageInterface>) => void;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState<Partial<MessageInterface>>({
        task_id,
        content: "",
        voice_note_src: "",
        asset: null,
    });

    const { data: session } = useSession({ required: true });
    const client = getClient(session);

    const updateContent = (value: any) =>
        setFormData((formData) => ({
            ...formData,
            content: value,
        }));
    const resetForm = () =>
        setFormData({
            task_id,
            content: "",
            voice_note_src: "",
            asset: null,
        });
    const handleEmojiSelect = (e: any) => {
        if (inputRef?.current) {
            inputRef.current.value = `${inputRef.current.value}${e.native}`;
            updateContent(inputRef?.current?.value || formData.content);
        }
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateContent(e.target.value);
    };
    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handlePressSend("content", formData);
        }
    };
    const handlePressSend = (
        name: keyof Partial<MessageInterface>,
        data: Partial<MessageInterface>
    ) => {
        if (data[name]) {
            if (
                typeof data[name] === "string" &&
                (data[name] as string).trim() === ""
            ) {
                return;
            }

            onMessageSend(data);
            resetForm(); // if voice note will force me to put it raw not using state replace resetForm with updateContent

            inputRef?.current && (inputRef.current.value = "");
        }
    };
    const handleAssetsUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);

        try {
            let assets = await uploadFiles(
                e,
                session,
                `tasks/${task_id}/assets`,
                true
            );

            if (assets) {
                handlePressSend("asset", {
                    ...formData,
                    asset: {
                        alt: assets[0].s3Path.Key,
                        src: assets[0].s3Path.Location,
                        type: assets[0].type,
                    },
                });
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }

        setLoading(false);
    };

    return (
        <>
            <Input
                className="chat__input rounded-b-md px-2 py-1"
                placeholder="Type a message"
                maxHeight={100}
                minHeight={46}
                multiline={true}
                referance={inputRef}
                value={formData.content || undefined}
                onChange={handleOnChange}
                onKeyPress={handleKeyPress}
                leftButtons={
                    <>
                        <MdOutlineEmojiEmotions
                            size={iconSize}
                            onClick={() => setShowPicker((state) => !state)}
                            cursor="pointer"
                        />
                        <label htmlFor="fileInput" className="ml-2 mr-1">
                            <FaPlus size={iconSize} cursor="pointer" />
                        </label>
                    </>
                }
                rightButtons={
                    formData.content ? (
                        <IoSendSharp
                            size={iconSize}
                            title="send"
                            cursor="pointer"
                            onClick={() => handlePressSend("content", formData)}
                        />
                    ) : (
                        <BiSolidMicrophone
                            size={iconSize}
                            title="voice note"
                            cursor="pointer"
                        />
                    )
                }
            />

            {showPicker && (
                <Picker data={emojiData} onEmojiSelect={handleEmojiSelect} />
            )}

            <input
                className="hidden"
                type="file"
                name="fileInput"
                id="fileInput"
                onChange={handleAssetsUpload}
            />
        </>
    );
}
