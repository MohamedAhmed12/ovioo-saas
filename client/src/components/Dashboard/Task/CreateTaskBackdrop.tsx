import DashBoardCard from "@/components/DashBoardCard";
import { useAppDispatch } from "@/hooks/redux";
import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import { TaskStatus } from "@/interfaces";
import { pushNewTask } from "@/store/features/board";
import "@/styles/components/dashboard/task/create-task-backdrop.scss";
import { getClient } from "@/utils/getClient";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/joy";
import { Dialog, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import OviooDropDown from "../OviooDropDown";
import TaskTypeDropDown from "../TaskTypeDropDown";

const LIST_PROJECTS = gql`
    query {
        listProjects {
            id
            title
            description
        }
    }
`;

const CREATE_TASK = gql`
    mutation CreateTask($data: CreateTaskDto!) {
        createTask(data: $data) {
            id
            designer {
                id
                fullname
                avatar
            }
            description
            title
            type {
                id
                title
            }
            status
            project {
                id
            }
        }
    }
`;

export default function CreateTaskBackdrop({
    open,
    status,
    handleClose,
}: {
    open: boolean;
    status: TaskStatus;
    handleClose: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const { errors, errorHandler } = useGraphError({});
    const [formData, setFormData] = useState({
        title: "",
        type_id: "",
        project_id: "",
        status:
            Object.values(TaskStatus).find((value) => value === status) ||
            "In queue",
    });

    const dispatch = useAppDispatch();
    const { handleOnChange } = useForm(setFormData);
    const { data: session } = useSession({
        required: true,
    });

    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_PROJECTS, { client, fetchPolicy: "no-cache" });
    const [createTask] = useMutation(CREATE_TASK, { client });

    const handlSelectProject = (project_id: string) => {
        setFormData((prevState) => ({ ...prevState, project_id }));
    };

    const handlSelectType = (type_id: string) => {
        setFormData((prevState) => ({ ...prevState, type_id }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await createTask({
                variables: {
                    data: formData,
                },
            });

            dispatch(pushNewTask(data.createTask));
            handleClose();
        } catch (e: any) {
            errorHandler(e);
        }
        setLoading(false);
    };

    return (
        !graphQLloading &&
        !error &&
        data.listProjects && (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                    },
                    className:
                        "!my-0 !max-h-none w-[80%] md:w-[45%] lg:w-[30%]",
                }}
                className="create-task-backdrop"
            >
                <DashBoardCard
                    handleSubmit={handleSubmit}
                    headerTitle="Add new Task"
                >
                    <div className="flex flex-col items-center">
                        <TaskTypeDropDown
                            onSelected={handlSelectType}
                            client={client}
                        />

                        <OviooDropDown
                            inputLabel="Project"
                            options={data?.listProjects}
                            onSelected={handlSelectProject}
                        />

                        <TextField
                            className="dashboard-input !w-[80%]"
                            margin="normal"
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title || ""}
                            onChange={handleOnChange}
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end mt-6 justify-center">
                        <span className="w-[80%] flex justify-end">
                            <Button
                                loading={loading}
                                type="submit"
                                className="bg-[--dashboard-primary] text-white "
                            >
                                create
                            </Button>
                        </span>
                    </div>
                </DashBoardCard>
            </Dialog>
        )
    );
}
