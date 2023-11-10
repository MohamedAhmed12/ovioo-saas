import TaskTypeDropDown from "@/components/Dashboard/TaskTypeDropDown";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useAppDispatch } from "@/hooks/redux";
import { Member, TaskInterface, TaskStatus, getTaskStatus } from "@/interfaces";
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
    const [activeUsers, setActiveUsers] = useState<Member[] | undefined>(
        task?.team?.members.filter((member) => member.isActive)
    );
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const session = useSession();
    const client = getClient(session);
    const [deleteTask] = useMutation(DELETE_TASK, { client });

    const getNumberOfExtraAvatar = (usersCount: any) => {
        if (activeUsers?.length == 0) return 0;

        return usersCount - NUM_SHOWN_ACTIVE_USERS <= 99
            ? `+${usersCount - NUM_SHOWN_ACTIVE_USERS}`
            : +99;
    };
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
    console.log(activeUsers);

    return (
        <div className="flex flex-col-reverse lg:flex-row task-modal__header justify-between max-w-full">
            <div className="flex flex-col-reverse lg:flex-row basis-1/2 items-start lg:items-center px-[25px] flex-wrap max-w-full">
                <OviooDropDown
                    options={Object.values(TaskStatus)}
                    onSelected={(status) => handleOnChange("status", status)}
                    initialVal={task.status}
                    className="task-status-dropdown"
                />

                <TaskTypeDropDown
                    onSelected={(typeId) =>
                        handleOnChange("type", { id: typeId })
                    }
                    initialVal={task.type?.id}
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
                {activeUsers && activeUsers?.length > 0 && (
                    <AvatarGroup
                        slotProps={{
                            additionalAvatar: {
                                slot: "testasasd",
                                contextMenu: "ssada",
                            },
                        }}
                    >
                        {activeUsers
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

                        {activeUsers.length > NUM_SHOWN_ACTIVE_USERS && (
                            <Tooltip
                                title={activeUsers
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
                                    {getNumberOfExtraAvatar(activeUsers.length)}
                                </Avatar>
                            </Tooltip>
                        )}
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
