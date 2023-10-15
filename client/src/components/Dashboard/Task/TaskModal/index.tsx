import { TaskInterface } from "@/interfaces";
import "@/styles/components/dashboard/task/task-modal.scss";
import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Chat from "./Chat";
import TaskModalBody from "./TaskModalBody";
import TaskModalHeader from "./TaskModalHeader";

export default function TaskModal({
    open,
    task,
    colId,
    setIsTaskModalOpen,
}: {
    open: boolean;
    task: TaskInterface;
    colId: number;
    setIsTaskModalOpen: (val: boolean) => void;
}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [title, setTitle] = useState(task.title || "");

    const validated = () => {
        if (!title?.trim()) {
            return false;
        }

        if (task?.subtasks && task.subtasks.length > 0) {
            for (let i = 0; i < task.subtasks.length; i++) {
                if (!task.subtasks[i].title.trim()) {
                    return false;
                }
            }
        }

        return true;
    };

    const onSubmit = () => {
        if (validated()) {
            // dispatch editTask
        }

        setIsTaskModalOpen(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={onSubmit}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                style: {
                    backgroundColor: "transparent",
                    width: "80%",
                    maxWidth: "80%",
                },
            }}
            className="task-modal"
        >
            <div className="flex flex-col my-auto font-bold mx-auto w-full ovioo-card with-shadow py-8 px-0">
                <TaskModalHeader
                    task={task}
                    colId={colId}
                    setIsTaskModalOpen={setIsTaskModalOpen}
                />

                <div className="flex flex-col-reverse lg:flex-row task__body-wrapper">
                    <TaskModalBody
                        task={task}
                        subtasks={task.subtasks}
                        colId={colId}
                        title={title}
                        setTitle={() => setTitle}
                    />
                    <Chat />
                </div>
            </div>
        </Dialog>
    );
}
