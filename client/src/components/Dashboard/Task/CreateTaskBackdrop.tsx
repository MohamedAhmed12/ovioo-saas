import DashBoardCard from "@/components/DashBoardCard";
import { useForm } from "@/hooks/useForm";
import { TaskStatus } from "@/interfaces";
import "@/styles/components/dashboard/task/create-task-backdrop.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@mui/joy";
import { Dialog, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { FormEvent, MouseEventHandler, useState } from "react";
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

export default function CreateTaskBackdrop({
    open,
    status,
    handleClose,
}: {
    open: boolean;
    status: TaskStatus;
    handleClose: MouseEventHandler<HTMLElement> | undefined;
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        project_id: "",
        status: status || TaskStatus.IN_QUEUE,
    });
    const { handleOnChange } = useForm(setFormData);
    const { data: session } = useSession({
        required: true,
    });

    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_PROJECTS, { client });

    const handlSelectProject = (project_id: string) => {
        setFormData((prevState) => ({ ...prevState, project_id }));
    };

    const handlSelectType = (type: string) => {
        setFormData((prevState) => ({ ...prevState, type }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
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
                        <TaskTypeDropDown onSelected={handlSelectType} />

                        <OviooDropDown
                            initialVal={data?.listProjects?.[0]?.id}
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
