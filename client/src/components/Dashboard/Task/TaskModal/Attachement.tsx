import AssetList from "@/components/Dashboard/Asset/AssetList";
import { TaskInterface } from "@/interfaces";
import { setTaskAssets } from "@/store/features/task";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const DELETE_ASSET = gql`
    mutation Mutation($asset: DeleteAssetDto!) {
        deleteAsset(asset: $asset)
    }
`;

export default function Attachement({ task }: { task: TaskInterface }) {
    const dispatch = useDispatch();
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [deleteAsset] = useMutation(DELETE_ASSET, { client });

    const handleDeleteAsset = async ({
        id,
        alt,
    }: {
        id: string;
        alt: string;
    }) => {
        try {
            const { data } = await deleteAsset({
                variables: {
                    asset: {
                        id,
                        alt,
                    },
                },
            });

            if (data.deleteAsset) {
                dispatch(
                    setTaskAssets(
                        task.assets?.filter((asset) => asset.id != id)
                    )
                );
                toast.success("Deleted successfully");
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };
    return (
        <>
            <p className="text-gray-500 tracking-widest text-sm mt-8 mb-3">
                Attachments
            </p>
            <AssetList
                task={task}
                assets={task.assets}
                handleDelete={handleDeleteAsset}
            />
        </>
    );
}
