
import AssetList from "@/components/Dashboard/Asset/AssetList";
import {
    Asset as AssetInterface,
    TaskInterface,
} from "@/interfaces";

export default function Attachement({
    task,
    handleDeleteAsset,
}: {
    task: TaskInterface;
    handleDeleteAsset: (asset:AssetInterface) => void;
}) {
    return (
        <>
            <p className="text-gray-500 tracking-widest text-sm mt-8 mb-3">
                Attachments
            </p>
            <AssetList task={task} handleDelete={handleDeleteAsset} />
        </>
    );
}
