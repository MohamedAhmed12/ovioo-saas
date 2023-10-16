"use client";

import { useAppDispatch } from "@/hooks/redux";
import { TaskInterface, TaskStatus } from "@/interfaces";
import { dragTask } from "@/store/features/board";
import { Typography } from "@mui/material";
import { DragEvent, FocusEvent, useState } from "react";
import Task from "./Task";
import CreateTaskForm from "./CreateTaskBackdrop";
import CreateTaskBackdrop from "./CreateTaskBackdrop";

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
    const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);
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

            <Typography
                variant="body1"
                className="new-task-btn !mt-4 capitalize font-bold text-[#0ea5e9] cursor-pointer"
                onClick={() => setOpenCreateTask(true)}
            >
                + new task
            </Typography>

            <CreateTaskBackdrop
                open={openCreateTask}
                status={title}
                handleClose={() => setOpenCreateTask(false)}
            />
        </div>
    );
}
