import { useAppSelector } from "@/hooks/redux";
import { ColumnInterface, SubTaskInterface, TaskInterface } from "@/interfaces";
import { useState, DragEvent } from "react";
import TaskModal from "./TaskModal";

export default function Task({ task, colId }: { task: TaskInterface; colId: number }) {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    let completed = 0;
    let subtasks = task.subtasks;

    if (subtasks) {
        subtasks.forEach((subtask: SubTaskInterface) => {
            if (subtask.isCompleted) {
                completed++;
            }
        });
    }

    const handleOnDrag = (e: DragEvent<HTMLDivElement>) => {
        console.log('task component', task.id);
        
        e.dataTransfer.setData("text", JSON.stringify({ taskId: task.id, prevColId: colId }));
    };

    return (
        <div>
            <div
                onClick={() => {
                    setIsTaskModalOpen(true);
                }}
                draggable
                onDragStart={handleOnDrag}
                className=" w-[280px] first:my-5 py-6 px-3 ovioo-card with-shadow dark:hover:text-[#0ea5e9] cursor-pointer "
            >
                <p className="font-bold tracking-wide text-black dark:text-white dark:hover:text-[#0ea5e9] hover:text-[#0ea5e9]">
                    {task.title}
                </p>
                {subtasks && (
                    <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
                        {completed} of {subtasks.length} completed tasks
                    </p>
                )}
            </div>

            <TaskModal
                open={isTaskModalOpen}
                task={task}
                colId={colId}
                setIsTaskModalOpen={setIsTaskModalOpen}
            />
        </div>
    );
}
