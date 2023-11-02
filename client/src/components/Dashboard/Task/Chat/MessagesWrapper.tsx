import { MessageInterface } from "@/interfaces/message";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import OviooMessage from "./OviooMessage";
import OviooSystemMessage from "./OviooSystemMessage";

export default function MessagesWrapper({
    task_id,
    messages,
    setShowPicker,
    fetchMore,
}: {
    task_id: string;
    messages: MessageInterface[];
    setShowPicker: Dispatch<SetStateAction<boolean>>;
    fetchMore: any;
}) {
    const [page, setPage] = useState<number>(1);
    const msgsWrapper = useRef<HTMLDivElement | null>(null);

    const handleScroll = (e: any) => {
        if (e.currentTarget.scrollTop == 0) {
            setPage((page) => page + 1);
            fetchMore({
                variables: {
                    data: {
                        task_id,
                        page: page + 1,
                    },
                },
                updateQuery: (
                    prev: any,
                    { fetchMoreResult }: { fetchMoreResult: any }
                ) => {
                    if (
                        !fetchMoreResult ||
                        fetchMoreResult.listMessages.length == 0
                    ) {
                        return prev;
                    }

                    return {
                        ...prev,
                        listMessages: [
                            ...fetchMoreResult.listMessages,
                            ...prev.listMessages,
                        ],
                    };
                },
            });
        }
    };

    return (
        <div
            ref={msgsWrapper}
            onScroll={handleScroll}
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
