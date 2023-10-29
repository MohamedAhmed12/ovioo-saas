import emojiData from "@emoji-mart/data";
import dynamic from "next/dynamic";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
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
}: {
    task_id: string;
    showPicker: boolean;
    setShowPicker: Dispatch<SetStateAction<boolean>>;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        task_id,
        content: "",
        voice_note_src: null,
        asset_src: null,
    });

    const handleEmojiSelect = (e: any) => {
        if (inputRef?.current) {
            inputRef.current.value = `${inputRef.current.value}${e.native}`;
            setFormData((prevState) => ({
                ...prevState,
                content: inputRef?.current?.value || formData.content,
            }));
        }
    };

    return (
        <>
            <Input
                className="chat__input absolute min-h[62px] max-h-[100px] px-2"
                referance={inputRef}
                value={formData.content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData((prevState) => ({
                        ...prevState,
                        content: e.target.value,
                    }))
                }
                maxHeight={30}
                placeholder="Type a message"
                multiline={true}
                leftButtons={
                    <>
                        <MdOutlineEmojiEmotions
                            size={iconSize}
                            onClick={() => setShowPicker((state) => true)}
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

            {!showPicker && (
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
