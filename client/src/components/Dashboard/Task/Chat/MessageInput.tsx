import { SendMessageDto } from "@/interfaces/message";
import emojiData from "@emoji-mart/data";
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
    onMessageSend: (formData: SendMessageDto) => void;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        task_id,
        content: "",
        voice_note_src: "",
        asset_src: "",
    });

    const clearForm = (name: string) => {
        setFormData((formData) => ({
            ...formData,
            [name]: "",
        }));
    };
    const handleEmojiSelect = (e: any) => {
        if (inputRef?.current) {
            inputRef.current.value = `${inputRef.current.value}${e.native}`;
            setFormData((prevState) => ({
                ...prevState,
                content: inputRef?.current?.value || formData.content,
            }));
        }
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            content: e.target.value,
        }));
    };
    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handlePressSend("content");
        }
    };
    const handlePressSend = (name: keyof SendMessageDto) => {
        if (formData[name].trim() !== "") {
            onMessageSend(formData);
            clearForm(name);
            inputRef?.current && (inputRef.current.value = "");
        }
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
                value={formData.content}
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
                            onClick={() => handlePressSend("content")}
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
                type="file"
                name="fileInput"
                id="fileInput"
                className="hidden"
            />
        </>
    );
}
