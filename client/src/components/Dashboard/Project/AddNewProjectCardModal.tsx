import DashBoardCard from "@/components/DashBoardCard";
import { useAppDispatch } from "@/hooks/redux";
import { useForm } from "@/hooks/useForm";
import { pushNewProject } from "@/store/features/project";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import EastIcon from "@mui/icons-material/East";
import { Box, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { FormEvent, MouseEvent, useState } from "react";
import toast from "react-hot-toast";

const CREATE_PROJECT = gql`
    mutation ($data: CreateProjectDto!) {
        createProject(data: $data) {
            id
            title
            description
        }
    }
`;

export default function AddNewProjectCardModal({
    open,
    handleToggleModal,
    client,
}: {
    open: boolean;
    handleToggleModal: (e: MouseEvent<HTMLElement> | null) => void;
    client: ApolloClient<any> | undefined;
}) {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const dispatch = useAppDispatch();
    const { handleOnChange } = useForm(setFormData);
    const [createProject] = useMutation(CREATE_PROJECT, { client });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
            handleToggleModal(null);
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <Modal
            open={open}
            onClose={() => handleToggleModal(null)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-center items-center px-90"
        >
            <Box>
                <DashBoardCard
                    headerTitle="add new project"
                    style={{ maxWidth: 500, padding: "45px 40px" }}
                    handleSubmit={handleSubmit}
                >
                    <>
                        <div className="flex flex-col lg:flex-row justify-between items-center w-full mb-8">
                            <div className="basis-3/12">
                                <Image
                                    src="https://picsum.photos/id/12/400/400"
                                    width="500"
                                    height="500"
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
                                value={formData.title || ""}
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
                                value={formData.description || ""}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex w-full justify-end mt-6">
                            <button
                                type="submit"
                                className="dashboard__btn capitalize px-9 py-3 font-bold text-base tracking-wider rounded-[4px]"
                            >
                                create project
                                <EastIcon className="dark:text-white ml-2" />
                            </button>
                        </div>
                    </>
                </DashBoardCard>
            </Box>
        </Modal>
    );
}
