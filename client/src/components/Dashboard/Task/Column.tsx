import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addTask, dragTask } from "@/store/features/board";
import { Typography } from "@mui/material";
import { shuffle } from "lodash";
import { DragEvent, useEffect, useState } from "react";
import Task from "./Task";
import { TaskStatus } from "@/interfaces";

const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
];

export default function Column({ colIndex }: { colIndex: number }) {
    const dispatch = useAppDispatch();
    const [color, setColor] = useState<string | undefined | null>(null);
    const [showNewTask, setShowNewTask] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState("");

    const columns = useAppSelector((state) => state.boardReducer.columns);
    const col = columns.find((col, i) => i === colIndex);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, []);

    if (col == undefined) return;

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));

        if (colIndex !== prevColIndex) {
            dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
        }
    };

    const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="mx-5 min-w-[280px] ">
            <p className=" font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
                <span className={`rounded-full w-4 h-4 ${color}`}></span>
                {col.name} ({col.tasks.length})
            </p>

            {col?.tasks?.map((task, index) => (
                <Task key={index} taskIndex={index} colIndex={colIndex} />
            ))}

            {showNewTask && (
                <input
                    onBlur={(e) => {
                        dispatch(
                            addTask({
                                id: 113,
                                title: e.target.value,
                                status: TaskStatus.IN_QUEUE,
                                colIndex,
                            })
                        );
                        setTaskTitle("");
                    }}
                    type="text"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    value={taskTitle}
                    className="mt-3 bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                    placeholder="New task"
                />
            )}

            <Typography
                variant="body1"
                className="new-task-btn capitalize font-bold mt-4 text-[#0ea5e9] cursor-pointer"
                onClick={() => setShowNewTask(true)}
            >
                + new task
            </Typography>
        </div>
    );
}
