"use client";

import { useAppDispatch } from "@/hooks/redux";
import { TaskInterface, TaskStatus } from "@/interfaces";
import { dragTask } from "@/store/features/board";
import { Typography } from "@mui/material";
import { DragEvent, FocusEvent, useState } from "react";
import Task from "./Task";

export default function Column({
    tasks,
    title,
    color,
}: {
    tasks: TaskInterface[];
    title: TaskStatus;
    color: string;
}) {
    const dispatch = useAppDispatch();
    const [showNewTask, setShowNewTask] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState("");

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        const { task } = JSON.parse(e.dataTransfer.getData("text"));

        if (task.status !== title) {
            dispatch(dragTask({ task, newColStatus: title }));
        }
    };

    const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
      
    };

    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            className="column mx-5 min-w-[280px] "
        >
            <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em]">
                <span
                    className="rounded-full w-4 h-4"
                    style={{ backgroundColor: `${color}` }}
                ></span>
                {title} ({tasks?.length || 0})
            </p>

            {tasks &&
                tasks.map((task, index) => <Task key={index} task={task} />)}

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

            {/* <CreateTaskBackdrop /> */}
        </div>
    );
}
