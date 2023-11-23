import TaskTypeDropDown from "@/components/Dashboard/TaskTypeDropDown";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Member, TaskInterface, TaskStatus } from "@/interfaces";
import { deleteTask as deleteTaskAction } from "@/store/features/board";
import { getClient } from "@/utils/getClient";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Badge from "@mui/material/Badge";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAccountCircle, MdDelete } from "react-icons/md";
import OviooDropDown from "../../OviooDropDown";

const NUM_SHOWN_ACTIVE_USERS = 3;
const DELETE_TASK = gql`
    mutation Mutation($id: String!) {
        deleteTask(id: $id)
    }
`;
const USER_STATUS_CHANGED = gql`
    subscription UserStatusChanged {
        userStatusChanged {
            id
            isActive
            avatar
            fullname
        }
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
    const [activeUsers, setActiveUsers] = useState<Member[]>(
        task?.team?.members.filter((member) => member.isActive) || []
    );
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isDesigner = useAppSelector((state) => state.userReducer.user);
    const session = useSession();
    const client = getClient(session);
    const [deleteTask] = useMutation(DELETE_TASK, { client });
    const { loading: userStatusChangedLoading, data: userStatusChangedData } =
        useSubscription(USER_STATUS_CHANGED, { client });

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

    useEffect(() => {
        if (!userStatusChangedLoading && userStatusChangedData) {
            const userIndex: number = activeUsers.findIndex(
                (user) => user.id == userStatusChangedData.userStatusChanged.id
            );

            userIndex == -1
                ? activeUsers.push(userStatusChangedData.userStatusChanged)
                : activeUsers.splice(userIndex, 1);
        }
    }, [activeUsers, userStatusChangedData, userStatusChangedLoading]);

    return (
        <div className="flex flex-col-reverse lg:flex-row task-modal__header justify-between max-w-full">
            <div
                className={`flex flex-col-reverse lg:flex-row items-start lg:items-center px-[25px] flex-wrap max-w-full ${
                    !isDesigner ? "basis-1/2" : ""
                }`}
            >
                <OviooDropDown
                    options={Object.values(TaskStatus)}
                    onSelected={(status) => handleOnChange("status", status)}
                    initialVal={task.status}
                    className="task-status-dropdown"
                    disabled={isDesigner}
                />

                <TaskTypeDropDown
                    onSelected={(typeId) =>
                        handleOnChange("type", { id: typeId })
                    }
                    initialVal={task.type?.id}
                    disabled={isDesigner}
                />

                {!isDesigner &&
                    (task?.designer?.avatar ? (
                        <Avatar
                            alt={task?.designer?.fullname || "designer"}
                            sx={{ width: 55, height: 55 }}
                            src={task?.designer?.avatar}
                        />
                    ) : (
                        <MdAccountCircle className="!text-[60px]" />
                    ))}
            </div>

            {!isDesigner && (
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
                                        {getNumberOfExtraAvatar(
                                            activeUsers.length
                                        )}
                                    </Avatar>
                                </Tooltip>
                            )}
                        </AvatarGroup>
                    )}
                    <IconButton onClick={setOpenDeleteModal}>
                        <MdDelete className="text-red-600 text-4xl" />
                    </IconButton>
                </div>
            )}

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
