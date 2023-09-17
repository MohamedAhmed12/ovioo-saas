import DashBoardCard from "@/components/DashBoardCard";
import { KeyboardArrowRight } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { MouseEvent } from "react";
import EastIcon from "@mui/icons-material/East";

export default function AddNewProjectCardModal({
    open,
    handleToggleModal,
}: {
    open: boolean;
    handleToggleModal: (e: MouseEvent<HTMLElement> | null) => void;
}) {
    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleToggleModal(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex justify-center items-center px-90"
            >
                <DashBoardCard
                    headerTitle="add new project"
                    style={{ maxWidth: 500, padding: "45px 40px" }}
                >
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

                        <Button
                            type="submit"
                            className="basis-6/12 new-project-btn capitalize text-white border-solid border-2 border-[--dashboard-primary] py-2 text-base tracking-widest"
                        >
                            + project cover
                        </Button>
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
                            autoComplete="title"
                            autoFocus
                        />
                        <TextField
                            className="dashboard-input"
                            margin="normal"
                            required
                            fullWidth
                            name="additional-info"
                            label="Additional Information"
                            type="email"
                            id="email"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="flex w-full justify-end mt-6">
                        <Button
                            type="submit"
                            className="dashboard__btn text-white capitalize px-9 py-3 font-bold text-base tracking-wider"
                        >
                            create project
                            <EastIcon className="dark:text-white ml-2" />
                        </Button>
                    </div>
                </DashBoardCard>
            </Modal>
        </div>
    );
}
