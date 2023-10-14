import TaskTypeDropDown from "@/components/Dashboard/TaskTypeDropDown";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useAppDispatch } from "@/hooks/redux";
import { TaskInterface, TaskStatus } from "@/interfaces";
import { deleteTask, setTaskStatus } from "@/store/features/board";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Avatar } from "@mui/material";
import { MouseEvent, useState } from "react";
import OviooDropDown from "../../OviooDropDown";

export default function TaskModalHeader({
    task,
    colId,
    setIsTaskModalOpen,
}: {
    task: TaskInterface;
    colId: number;
    setIsTaskModalOpen: (val: boolean) => void;
}) {
    const dispatch = useAppDispatch();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const onDeleteBtnClick = (e: MouseEvent<HTMLElement>) => {
        dispatch(deleteTask({ taskId: task.id, colId }));
        setIsTaskModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const handleStatusChanged = (status: string) => {
        dispatch(setTaskStatus({ taskId: task.id, status }));
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row task__header justify-between max-w-full">
            <div className="flex flex-col-reverse lg:flex-row basis-1/2 items-start lg:items-center px-8 flex-wrap max-w-full">
                <OviooDropDown
                    options={Object.values(TaskStatus)}
                    onSelected={handleStatusChanged}
                    initialVal={task.status || TaskStatus.InQueue}
                />
                <TaskTypeDropDown />
                <Avatar
                    alt="Remy Sharp"
                    sx={{ width: 56, height: 56 }}
                    src="/static/images/avatar/1.jpg"
                    className="ml-3"
                />
            </div>
            <div className="basis-1/2 flex justify-end px-8 lg:items-center">
                <DeleteOutlineIcon color="error" fontSize="large" onClick={setOpenDeleteModal} />
            </div>
            {isDeleteModalOpen && (
                <DeleteModal
                    onDeleteBtnClick={() => onDeleteBtnClick}
                    type="task"
                    title={task.title}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            )}
        </div>
    );
}
