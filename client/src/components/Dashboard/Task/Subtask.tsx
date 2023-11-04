import { useAppDispatch } from "@/hooks/redux";
import { SubTaskInterface } from "@/interfaces";
import { useState } from "react";

export default function Subtask({
    subtasks,
}: {
    subtasks: SubTaskInterface[];
}) {
    const [subtaskTitle, setSubtaskTitle] = useState("");

    const completed = subtasks?.reduce(
        (count, subtask) => (subtask.isCompleted ? count++ : count--),
        0
    );

    const dispatch = useAppDispatch();

    return (
        <>
            <p className="text-gray-500 tracking-widest text-sm">
                Subtasks ({completed} of {subtasks.length})
            </p>
            <div className=" mt-3 space-y-2">
                {subtasks.map((subtask) => (
                    <div
                        className="flex flex-row items-center"
                        key={subtask.title}
                    >
                        <div className="flex-grow flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
                            <input
                                className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
                                type="checkbox"
                                checked={subtask.isCompleted}
                            />
                            <p
                                className={
                                    subtask.isCompleted
                                        ? " line-through opacity-30 "
                                        : ""
                                }
                            >
                                {subtask.title}
                            </p>
                        </div>
                    </div>
                ))}
                <div className="flex flex-row items-center">
                    <input
                        type="text"
                        value={subtaskTitle}
                        className="mr-9 bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                        placeholder="New task"
                    />
                </div>
            </div>
        </>
    );
}
