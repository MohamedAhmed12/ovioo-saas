import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedTask } from "@/store/features/task";
import "@/styles/components/dashboard/task/task-modal.scss";
import { getClient } from "@/utils/getClient";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Chat from "../Chat";
import TaskModalBody from "./TaskModalBody";
import TaskModalHeader from "./TaskModalHeader";

const SHOW_TASK = gql`
    query ShowTask($id: String!) {
        showTask(id: $id) {
            id
            designer {
                id
                fullname
                avatar
            }
            description
            title
            status
            project {
                id
            }
            type {
                id
            }
            assets {
                id
                src
                alt
                type
            }
            subtasks {
                id
                title
                status
            }
            team {
                id
                members {
                    id
                    avatar
                    fullname
                    isActive
                }
            }
        }
    }
`;
const EDIT_TASK = gql`
    mutation updateTask($data: UpdateTaskDto!) {
        updateTask(data: $data) {
            id
        }
    }
`;

export default function TaskModal({
    open,
    taskId,
    onClose,
}: {
    open: boolean;
    taskId: string;
    onClose: () => void;
}) {
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const theme = useTheme();
    const dispatch = useAppDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const task = useAppSelector((state) => state.taskReducer.selectedTask);
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [editTask] = useMutation(EDIT_TASK, { client });
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(SHOW_TASK, {
        client,
        variables: {
            id: taskId,
        },
        fetchPolicy: "no-cache",
    });

    if (error) throw new Error(error.message);

    useEffect(() => {
        if (!graphQLloading && data?.showTask) {
            dispatch(setSelectedTask(data?.showTask));
            setInitialDataLoaded(true);
        }
    }, [graphQLloading, data, data?.showTask, dispatch]);

    const handleOnChange = (name: string, value: any) =>
        dispatch(setSelectedTask({ ...task, [name]: value }));

    const onSubmit = async () => {
        if (!task) return;
        try {
            const { designer, assets, subtasks, team, ...restTask } = task;
            await editTask({
                variables: {
                    data: restTask,
                },
            });
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        onClose();
    };

    return (
        initialDataLoaded &&
        task && (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onSubmit}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        width: "85%",
                        maxWidth: "85%",
                    },
                }}
                className="task-modal"
            >
                <div className="flex flex-col my-auto mx-auto w-full ovioo-card with-shadow py-8 px-0">
                    <TaskModalHeader
                        task={task}
                        onClose={onClose}
                        handleOnChange={handleOnChange}
                    />

                    <div className="flex flex-col-reverse lg:flex-row task__body-wrapper">
                        <TaskModalBody
                            task={task}
                            handleOnChange={handleOnChange}
                        />
                        <Chat client={client} task={task} />
                    </div>
                </div>
            </Dialog>
        )
    );
}
