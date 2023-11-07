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
const READ_MESSAGES = gql`
    mutation ReceiveAllSentMessages($taskId: String!) {
        readTaskMessages(taskId: $taskId)
    }
`;

export default function TaskModal({
    open,
    taskId,
    setIsTaskModalOpen,
}: {
    open: boolean;
    taskId: string;
    setIsTaskModalOpen: (val: boolean) => void;
}) {
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const theme = useTheme();
    const dispatch = useAppDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const task = useAppSelector((state) => state.taskReducer.selectedTask);
    const { data: session, status } = useSession({ required: true });
    const client = getClient(session);
    const [editTask] = useMutation(EDIT_TASK, { client });
    const [readTaskMessages] = useMutation(READ_MESSAGES, { client });
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
            readTaskMessages({ variables: { taskId: data?.showTask.id } });
        }
    }, [graphQLloading, data, data?.showTask, dispatch]);

    const handleOnChange = (name: string, value: any) =>
        dispatch(setSelectedTask({ ...task, [name]: value }));

    const onSubmit = async () => {
        try {
            const { designer, assets, subtasks, ...restTask } = task;
            await editTask({
                variables: {
                    data: restTask,
                },
            });
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        setIsTaskModalOpen(false);
    };

    return (
        initialDataLoaded && (
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
                        setIsTaskModalOpen={setIsTaskModalOpen}
                        handleOnChange={handleOnChange}
                    />

                    <div className="flex flex-col-reverse lg:flex-row task__body-wrapper">
                        <TaskModalBody
                            task={task}
                            handleOnChange={handleOnChange}
                        />
                        <Chat client={client} task_id={task.id} />
                    </div>
                </div>
            </Dialog>
        )
    );
}
