import TaskTypeDropDown from "@/components/Dashboard/TaskTypeDropDown";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useAppDispatch } from "@/hooks/redux";
import { TaskInterface, getTaskStatus } from "@/interfaces";
import { deleteTask as deleteTaskAction } from "@/store/features/board";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Badge from "@mui/material/Badge";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdAccountCircle, MdDelete } from "react-icons/md";
import OviooDropDown from "../../OviooDropDown";

const NUM_SHOWN_ACTIVE_USERS = 3;
const DELETE_TASK = gql`
    mutation Mutation($id: String!) {
        deleteTask(id: $id)
    }
`;

export default function TaskModalHeader({
    task,
    onClose,
    handleOnChange,
}: {
    task: TaskInterface;
    onClose: (val: boolean) => void;
    handleOnChange: (name: string, value: any) => void;
}) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const session = useSession();
    const client = getClient(session);
    const [deleteTask] = useMutation(DELETE_TASK, { client });

    const getNumberOfExtraAvatar = (usersCount: any) =>
        usersCount - NUM_SHOWN_ACTIVE_USERS <= 99
            ? `+${usersCount - NUM_SHOWN_ACTIVE_USERS}`
            : +99;
    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };
    const onDeleteBtnClick = async (e: MouseEvent<HTMLElement>) => {
        try {
            const { data } = await deleteTask({
                variables: {
                    id: task.id,
                },
            });

            if (data.deleteTask) {
                dispatch(deleteTaskAction(task));
                onClose(false);
            }
        } catch (error) {
            toast.error("Something went wrong!");
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row task-modal__header justify-between max-w-full">
            <div className="flex flex-col-reverse lg:flex-row basis-1/2 items-start lg:items-center px-[25px] flex-wrap max-w-full">
                <OviooDropDown
                    options={getTaskStatus()}
                    onSelected={(status) => handleOnChange("status", status)}
                    initialVal={task.status}
                    className="task-status-dropdown"
                />

                <TaskTypeDropDown
                    onSelected={(typeId) =>
                        handleOnChange("type", { id: typeId })
                    }
                    initialVal={task.type.id}
                />

                {task?.designer?.avatar ? (
                    <Avatar
                        alt={task?.designer?.fullname || "designer"}
                        sx={{ width: 55, height: 55 }}
                        src={task?.designer?.avatar}
                    />
                ) : (
                    <MdAccountCircle className="!text-[60px]" />
                )}
            </div>
            <div className="basis-1/2 flex justify-end px-[25px] lg:items-center">
                {task?.team?.members && (
                    <AvatarGroup
                        slotProps={{
                            additionalAvatar: {
                                slot: "testasasd",
                                contextMenu: "ssada",
                            },
                        }}
                    >
                        {task?.team?.members
                            .slice(0, NUM_SHOWN_ACTIVE_USERS)
                            .map((member) => (
                                <Badge
                                    key={member.id}
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    variant="dot"
                                >
                                    <Tooltip title={member.fullname}>
                                        <Avatar
                                            alt={member.fullname}
                                            src={member.avatar}
                                        />
                                    </Tooltip>
                                </Badge>
                            ))}

                        <Tooltip
                            title={task?.team?.members
                                .slice(NUM_SHOWN_ACTIVE_USERS)
                                .map((member) => (
                                    <span
                                        key={member.id}
                                        className="flex flex-wrap"
                                    >
                                        {member.fullname}
                                    </span>
                                ))}
                        >
                            <Avatar>
                                {getNumberOfExtraAvatar(
                                    task?.team?.members.length
                                )}
                            </Avatar>
                        </Tooltip>
                    </AvatarGroup>
                )}
                <IconButton onClick={setOpenDeleteModal}>
                    <MdDelete className="text-red-600 text-4xl" />
                </IconButton>
            </div>
            {isDeleteModalOpen && (
                <DeleteModal
                    onDeleteBtnClick={onDeleteBtnClick}
                    type="task"
                    title={task.title}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            )}
        </div>
    );
}
