import { useAppDispatch } from "@/hooks/redux";
import "@/styles/components/dashboard/task/task-modal.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import TaskModalBody from "./TaskModalBody";
import TaskModalHeader from "./TaskModalHeader";

const ShowTask = gql`
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
            children {
                id
                title
                status
            }
        }
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
    const [loading, setLoading] = useState(false);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        designer: {
            id: "",
            fullname: "",
            avatar: "",
        },
        description: "",
        title: "",
        status: "",
        project: {
            id: "",
        },
        type: {
            id: "",
        },
        assets: [],
        children: [],
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useAppDispatch();
    const { data: session, status } = useSession({ required: true });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(ShowTask, {
        client,
        variables: {
            id: taskId,
        },
        fetchPolicy: "no-cache",
    });

    if (error) throw new Error(error.message);

    useEffect(() => {
        if (!graphQLloading && data?.showTask) {
            setFormData(data?.showTask);
            setInitialDataLoaded(true);
        }
    }, [graphQLloading, data, data?.showTask]);

    // const [title, setTitle] = useState(task.title || "");
    // console.log("task moal mounte");

    const onSubmit = () => {
        // dispatch editTask

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
                        width: "80%",
                        maxWidth: "80%",
                    },
                }}
                className="task-modal"
            >
                <div className="flex flex-col my-auto font-bold mx-auto w-full ovioo-card with-shadow py-8 px-0">
                    <TaskModalHeader
                        task={formData}
                        setIsTaskModalOpen={setIsTaskModalOpen}
                    />

                    <div className="flex flex-col-reverse lg:flex-row task__body-wrapper">
                        <TaskModalBody
                            task={formData}
                        />
                        <Chat />
                    </div>
                </div>
            </Dialog>
        )
    );
}
