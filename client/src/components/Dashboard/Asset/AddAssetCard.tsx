import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Button from "@mui/material/Button";

export default function AddAssetCard() {
    const handleAssetsUpload = () => { }

    return (
        <Button
            variant="outlined"
            component="label"
            role={undefined}
            tabIndex={-1}
            className="add-asset-card flex flex-col items-center !rounded-lg w-full h-full opacity-50 hover:opacity-90 outline-dashed"
        >
            <NoteAddIcon sx={{ fontSize: 60 }} />
            <h3 className="text-base capitalize font-bold tracking-wider mt-2">
                new file
            </h3>
            <input type="file" className="dashboard-file-upload" onChange={handleAssetsUpload} multiple />
        </Button>
    );
}
