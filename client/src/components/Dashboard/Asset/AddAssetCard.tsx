import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

import { ChangeEvent } from "react";

export default function AddAssetCard({
    handleAssetsUpload,
    loading,
}: {
    handleAssetsUpload: (e: ChangeEvent<HTMLInputElement>) => any;
    loading: boolean;
}) {
    return (
        <Button
            variant="outlined"
            component="label"
            role={undefined}
            tabIndex={-1}
            className="add-asset-card flex flex-col items-center !rounded-lg w-full h-full opacity-50 hover:opacity-90 outline-dashed"
        >
            {loading ? (
                <CircularProgress color="inherit" />
            ) : (
                <>
                    <NoteAddIcon sx={{ fontSize: 60 }} />
                    <h3 className="text-base capitalize font-bold tracking-wider mt-2">
                        new file
                    </h3>
                    <input
                        type="file"
                        className="dashboard-file-upload"
                        onChange={handleAssetsUpload}
                        multiple
                    />
                </>
            )}
        </Button>
    );
}
