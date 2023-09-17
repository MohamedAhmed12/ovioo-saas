import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { MouseEvent } from "react";

export default function AddNewProjectCard({
    handleToggleModal,
}: {
    handleToggleModal: (e: MouseEvent<HTMLElement> | null) => void;
}) {
    return (
        <Card className="ovioo-card min-w-[250px]" onClick={handleToggleModal}>
            <Button
                variant="outlined"
                className="w-full h-full opacity-50 hover:opacity-90 outline-dashed"
                sx={{ borderRadius: "10px" }}
            >
                <CardContent className="flex flex-col items-center" style={{ padding: "0px" }}>
                    <CreateNewFolderIcon sx={{ fontSize: 85 }} />
                    <h3 className="text-lg capitalize font-bold tracking-wider mb-2">
                        new project
                    </h3>
                    <p className="normal-case">Group your tasks in a project</p>
                </CardContent>
            </Button>
        </Card>
    );
}
