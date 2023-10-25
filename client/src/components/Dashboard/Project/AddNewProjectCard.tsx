import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FaFolderPlus } from "react-icons/fa6";

export default function AddNewProjectCard({
    handleToggleModal,
}: {
    handleToggleModal: () => void;
}) {
    return (
        <Card
            className="ovioo-card min-w-[250px] mx-5 my-5"
            onClick={handleToggleModal}
        >
            <Button
                variant="outlined"
                className="w-full min-h-[332px] opacity-50 hover:opacity-90 outline-dashed"
                sx={{ borderRadius: "10px" }}
            >
                <CardContent
                    className="flex flex-col items-center"
                    style={{ padding: "0px" }}
                >
                    <FaFolderPlus size="80" />
                    <h3 className="text-lg capitalize font-bold tracking-wider mt-3">
                        new project
                    </h3>
                    <p className="normal-case">Group your tasks in a project</p>
                </CardContent>
            </Button>
        </Card>
    );
}
