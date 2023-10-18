import TaskTypeDropDown from "@/components/Dashboard/TaskTypeDropDown";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useAppDispatch } from "@/hooks/redux";
import { TaskInterface, TaskStatus } from "@/interfaces";
import { setTaskStatus } from "@/store/features/board";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Avatar } from "@mui/material";
import { MouseEvent, useState } from "react";
import OviooDropDown from "../../OviooDropDown";

export default function TaskModalHeader({
    task,
    setIsTaskModalOpen,
}: {
    task: TaskInterface;
    setIsTaskModalOpen: (val: boolean) => void;
}) {
    const dispatch = useAppDispatch();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const onDeleteBtnClick = (e: MouseEvent<HTMLElement>) => {
        setIsTaskModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const handleStatusChanged = (status: string) => {
        dispatch(setTaskStatus({ taskId: task.id, status }));
    };

    const handlSelectType = (type_id: string) => {
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row task-modal__header justify-between max-w-full">
            <div className="flex flex-col-reverse lg:flex-row basis-1/2 items-start lg:items-center px-8 flex-wrap max-w-full">
                <OviooDropDown
                    options={Object.values(TaskStatus)}
                    onSelected={handleStatusChanged}
                    initialVal={task.status}
                />

                <TaskTypeDropDown
                    onSelected={handlSelectType}
                    initialVal={task.type.id}
                />

                {task?.designer?.avatar ? (
                    <Avatar
                        alt={task?.designer?.fullname || "designer"}
                        sx={{ width: 55, height: 55 }}
                        src={task?.designer?.avatar}
                    />
                ) : (
                    <AccountCircleIcon className="!text-[65px] mx-2 lg:mx-4" />
                )}
            </div>
            <div className="basis-1/2 flex justify-end px-8 lg:items-center">
                <DeleteOutlineIcon
                    color="error"
                    fontSize="large"
                    onClick={setOpenDeleteModal}
                />
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
