import DeleteModal from "@/components/Modals/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { SubTaskInterface, TaskInterface, TaskStatus } from "@/interfaces";
import { deleteTask, editTask, setTaskStatus } from "@/store/features/board";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { ChangeEvent, MouseEvent, useState } from "react";
import OviooDropDown from "../OviooDropDown";
import Attachement from "./Attachement";
import Subtask from "./Subtask";

const images = [
    "https://picsum.photos/id/1/400/400",
    "https://picsum.photos/id/12/400/400",
    "https://picsum.photos/id/33/400/400",
    "https://picsum.photos/id/45/400/400",
    "https://picsum.photos/id/51/400/400",
    "https://picsum.photos/id/66/400/400",
];

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
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [description, setDescription] = useState("");

    const [title, setTitle] = useState(task?.title);
    const [status, setStatus] = useState(task?.status);

    let subtasks = task.subtasks;

    let completed = 0;
    if (subtasks) {
        subtasks.forEach((subtask) => {
            if (subtask.isCompleted) {
                completed++;
            }
        });
    }

    const onDeleteBtnClick = (e: MouseEvent<HTMLElement>) => {
        dispatch(deleteTask({ taskId: task.id, colId }));
        setIsTaskModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const onChangeSubtasks = (id: number, newValue: string) => {
        if (!subtasks) return;

        subtasks = subtasks.map((subtask) => {
            if (subtask.id === id) {
                subtask.title = newValue;
            }

            return subtask;
        });
    };

    const validate = () => {
        setIsValid(false);

        if (!title?.trim()) {
            return false;
        }

        if (subtasks && subtasks.length > 0) {
            for (let i = 0; i < subtasks.length; i++) {
                if (!subtasks[i].title.trim()) {
                    return false;
                }
            }
        }

        setIsValid(true);
        return true;
    };

    if (isFirstLoad && task && task.subtasks) {
        subtasks = subtasks
            ? subtasks.map((subtask: SubTaskInterface) => {
                  return { ...subtask, id: 134 };
              })
            : [];
        setTitle(task.title || "");
        setDescription(task.description || "");
        setIsFirstLoad(false);
    }

    const onSubmit = () => {
        // dispatch(
        //     editTask({
        //         ...task,
        //         title,
        //         taskIndex,
        //         colIndex,
        //         newColIndex,
        //     })
        // );
    };

    const handleStatusChanged = (status: string) => {
        dispatch(setTaskStatus({ taskId: task.id, status }));
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={() => {
                const isValid = validate();
                if (isValid) {
                    onSubmit();
                    setIsTaskModalOpen(false);
                }
            }}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                style: {
                    backgroundColor: "transparent",
                    width: "80%",
                    maxWidth: "80%",
                },
            }}
        >
            <div className="flex flex-col my-auto font-bold mx-auto w-full ovioo-card with-shadow py-8 px-0">
                <div className="flex task__header justify-between mb-10 px-8">
                    <div className="basis-1/2">
                        {task.status}
                        <OviooDropDown
                            options={Object.values(TaskStatus)}
                            onSelected={handleStatusChanged}
                            initialVal={task.status || TaskStatus.InQueue}
                        />
                    </div>
                    <div className="basis-1/2 flex justify-end">
                        <DeleteOutlineIcon
                            color="error"
                            fontSize="large"
                            onClick={setOpenDeleteModal}
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row task__body">
                    <div className="basis-1/2 p-8">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="task-name-input"
                            type="text"
                            className="bg-transparent w-full px-4 py-2 outline-none focus:border-0 rounded-md text-3xl  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
                            placeholder=" e.g Take coffee break"
                        />

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="task-description-input"
                            className="mt-8 w-full  bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                            placeholder="Description e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                        />
                        <div className="mt-8 flex flex-col space-y-3">
                            {/* {subtasks && (
                                <Subtask
                                    subtasks={subtasks}
                                    setSubtasks={(
                                        newSubtask: SubTaskInterface[] | [] | undefined
                                    ) => (subtasks = newSubtask)}
                                    taskIndex={taskIndex}
                                    colIndex={colIndex}
                                />
                            )} */}
                        </div>
                        <div className="mt-8 flex flex-col space-y-3">
                            <Attachement images={images} />
                        </div>
                    </div>
                    <div className="basis-1/2 p-8">
                        <div className="mt-8 flex flex-col space-y-3">x</div>
                    </div>
                </div>
            </div>
            {isDeleteModalOpen && (
                <DeleteModal
                    onDeleteBtnClick={() => onDeleteBtnClick}
                    type="task"
                    title={task.title}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            )}
        </Dialog>
    );
}
