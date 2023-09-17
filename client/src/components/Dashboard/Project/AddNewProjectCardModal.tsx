import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import { MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";

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
            >
                <Card className="ovioo-card min-w-[250px]" onClick={handleToggleModal}>
                    <CardContent className="flex flex-col items-center" style={{ padding: "0px" }}>
                        <Avatar src="https://picsum.photos/id/1/1000/1000" className="mb-5" />
                        {/* <CreateNewFolderIcon sx={{ fontSize: 85 }} /> */}
                        <h3 className="text-lg capitalize font-bold tracking-wider mb-2">
                            new project
                        </h3>
                        <Button color="primary" variant="outlined">
                            <AddIcon className="mr-1 font-bold" fontSize="small" /> add cover
                        </Button>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
}
