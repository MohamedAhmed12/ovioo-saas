import { useAppSelector } from "@/hooks/redux";
import { ColumnInterface, SubTaskInterface, TaskInterface } from "@/interfaces";
import { useState, DragEvent } from "react";
import TaskModal from "./TaskModal";

export default function Task({ colIndex, taskIndex }: { colIndex: number; taskIndex: number }) {
    const columns = useAppSelector((state) => state.boardReducer.columns);
    const col = columns.find((col: ColumnInterface, i) => i === colIndex);
    const task = col && col.tasks.find((task: TaskInterface, i) => i === taskIndex);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    if (!task) return;

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
        e.dataTransfer.setData("text", JSON.stringify({ taskIndex, prevColIndex: colIndex }));
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
                colIndex={colIndex}
                taskIndex={taskIndex}
                setIsTaskModalOpen={setIsTaskModalOpen}
            />
        </div>
    );
}
