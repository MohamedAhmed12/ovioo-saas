import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addTask, dragTask } from "@/store/features/board";
import { Typography } from "@mui/material";
import { shuffle } from "lodash";
import { DragEvent, FocusEvent, useEffect, useState } from "react";
import Task from "./Task";
import { TaskStatus } from "@/interfaces";

export default function Column({ title, color }: { title: TaskStatus; color: string }) {
    const dispatch = useAppDispatch();
    const [showNewTask, setShowNewTask] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState("");

    const columns = useAppSelector((state) => state.boardReducer.columns);
    const col = columns.find((col, i) => col.title === title) || columns[0];

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        const { prevColId, taskId } = JSON.parse(e.dataTransfer.getData("text"));

        if (col.id !== prevColId) {
            dispatch(dragTask({ colId: col.id, prevColId, taskId }));
        }
    };

    const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (e?.target?.value) {
            dispatch(
                addTask({
                    id: 113,
                    title: e.target.value,
                    status: TaskStatus.InQueue,
                    colId: col.id,
                })
            );
        }
        setTaskTitle("");
    };

    return (
        <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="mx-5 min-w-[280px] ">
            <p className=" font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em]">
                <span
                    className="rounded-full w-4 h-4"
                    style={{ backgroundColor: `${color}` }}
                ></span>
                {title} ({col?.tasks.length || 0})
            </p>

            {col?.tasks?.map((task, index) => (
                <Task key={index} task={task} colId={col.id} />
            ))}

            {showNewTask && (
                <input
                    onBlur={handleOnBlur}
                    type="text"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    value={taskTitle}
                    className="mt-3  text-black dark:text-white bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                    placeholder="New task"
                />
            )}

            <Typography
                variant="body1"
                className="new-task-btn !mt-4 capitalize font-bold text-[#0ea5e9] cursor-pointer"
                onClick={() => setShowNewTask(true)}
            >
                + new task
            </Typography>
        </div>
    );
}
