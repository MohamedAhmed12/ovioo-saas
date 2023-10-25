import DashBoardCard from "@/components/DashBoardCard";
import { useAppDispatch } from "@/hooks/redux";
import { useForm } from "@/hooks/useForm";
import { Project as ProjectInterface } from "@/interfaces";
import { pushNewProject, replaceProject } from "@/store/features/project";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";

const CREATE_PROJECT = gql`
    mutation ($data: CreateProjectDto!) {
        createProject(data: $data) {
            id
            title
            description
        }
    }
`;

const EDIT_PROJECT = gql`
    mutation ($data: UpdateProjectDto!) {
        updateProject(data: $data)
    }
`;

export default function AddNewProjectCardModal({
    open,
    handleToggleModal,
    client,
    projectToEdit,
}: {
    open: boolean;
    handleToggleModal: () => void;
    client: ApolloClient<any> | undefined;
    projectToEdit: ProjectInterface | {};
}) {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const dispatch = useAppDispatch();
    const { handleOnChange } = useForm(setFormData);
    const [createProject] = useMutation(CREATE_PROJECT, { client });
    const [updateProject] = useMutation(EDIT_PROJECT, { client });

    useEffect(() => {
        if (Object.keys(projectToEdit).length > 0) {
            setFormData({
                title: (projectToEdit as ProjectInterface)?.title,
                description: (projectToEdit as ProjectInterface)?.description,
            });
        }
    }, [projectToEdit]);

    const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await createProject({
                variables: {
                    data: formData,
                },
            });

            dispatch(pushNewProject(data.createProject));
            data && toast.success("Project created successfully");
            handleClose();
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await updateProject({
                variables: {
                    data: {
                        id: (projectToEdit as ProjectInterface).id,
                        ...formData,
                    },
                },
            });

            if (data.updateProject) {
                dispatch(replaceProject({ id: projectToEdit.id, ...formData }));
                data && toast.success("Project edited successfully");
                handleClose();
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    const handleClose = () => {
        handleToggleModal();
        setFormData({
            title: "",
            description: "",
        });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-center items-center px-90"
        >
            <Box>
                <DashBoardCard
                    headerTitle="add new project"
                    style={{
                        maxWidth: 500,
                        padding: "45px 40px",
                        margin: 0,
                        maxHeight: 480,
                    }}
                    handleSubmit={projectToEdit ? handleEdit : handleCreate}
                >
                    <>
                        <div className="flex flex-row justify-between items-center w-full mb-8">
                            <div className="basis-3/12">
                                <Image
                                    src="https://picsum.photos/id/12/400/400"
                                    width="150"
                                    height="150"
                                    alt="profile"
                                    className="rounded-full max-w-full"
                                />
                            </div>

                            <button
                                type="submit"
                                className="basis-6/12 new-project-btn capitalize text-white border-solid border-[3px] border-[--dashboard-primary] hover:bg-[--dashboard-primary] py-2 text-sm tracking-widest rounded-[4px]"
                            >
                                + project cover
                            </button>
                        </div>
                        <div className="mb-8">
                            <TextField
                                className="dashboard-input"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleOnChange}
                            />
                            <TextField
                                className="dashboard-input"
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Additional Information"
                                type="description"
                                id="description"
                                value={formData.description}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex w-full justify-end">
                            <button
                                type="submit"
                                className="dashboard__btn capitalize px-8 py-3 font-bold tracking-wider rounded-[4px]"
                            >
                                {projectToEdit
                                    ? "edit project"
                                    : "create project"}
                                <FaArrowRight className="dark:text-white ml-2 !text-base lg:!text-xl inline-block" />
                            </button>
                        </div>
                    </>
                </DashBoardCard>
            </Box>
        </Modal>
    );
}
