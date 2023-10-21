"use client";

import {
    Asset as AssetInterface,
    TaskInterface,
    s3PathInterface,
} from "@/interfaces";
import { setTaskAssets } from "@/store/features/task";
import "@/styles/components/dashboard/asset/asset-list.scss";
import { getClient } from "@/utils/getClient";
import { uploadFiles } from "@/utils/helpers";
import { gql, useMutation } from "@apollo/client";
import Box from "@mui/joy/Box";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AddAssetCard from "./AddAssetCard";
import AssetWrapper from "./AssetWrapper";

const CREATE_ASSET = gql`
    mutation Mutation($data: CreateAssetDto!) {
        createAssets(data: $data) {
            id
            src
            alt
            type
            project {
                id
            }
            task {
                id
            }
        }
    }
`;
const DELETE_ASSET = gql`
    mutation Mutation($asset: DeleteAssetDto!) {
        deleteAsset(asset: $asset)
    }
`;

export default function AssetList({
    task,
    assets,
    readOnly,
    title,
    handleDelete,
}: {
    task?: TaskInterface;
    assets: AssetInterface[];
    readOnly?: boolean;
    title?: string;
    handleDelete: (asset: AssetInterface) => void;
}) {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [createAssets] = useMutation(CREATE_ASSET, { client });
    const [deleteAsset] = useMutation(DELETE_ASSET, { client });

    const handleAssetsUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!task) return;

        setLoading(true);

        let assets = await uploadFiles(e, session);
        assets = assets.map(
            ({ type, s3Path }: { type: string; s3Path: s3PathInterface }) => ({
                alt: s3Path.Key,
                src: s3Path.Location,
                type,
            })
        );

        try {
            const { data } = await createAssets({
                variables: {
                    data: {
                        task_id: task.id,
                        assets,
                    },
                },
            });

            if (data?.createAssets) {
                dispatch(
                    setTaskAssets([...task.assets, ...data?.createAssets])
                );
                toast.success("Uploaded successfully");
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
            AssetUploadCleanup(assets);
        }

        setLoading(false);
    };

    const AssetUploadCleanup = (assets: AssetInterface[]) => {
        /* Delete assets from S3 if creation of assets record
         * on our serverfailed
         * If "id" provided then it will delete both in DB & S3
         */
        assets.map(async ({ id, alt }: { id: string; alt: string }) => {
            const { data } = await deleteAsset({
                variables: {
                    asset: {
                        id,
                        alt,
                    },
                },
            });
        });
    };

    return (
        <Box
            flexDirection="column"
            className="asset-list flex p-0 cursor-pointer"
        >
            {title && <h4 className="text-xl capitalize mb-4">{title}</h4>}
            <Box
                component="ul"
                flexDirection="row"
                className="flex gap-6 flex-wrap"
            >
                {assets.map((asset) => (
                    <AssetWrapper
                        key={asset.id}
                        handleDelete={handleDelete}
                        client={client}
                        asset={asset}
                    />
                ))}

                {!readOnly && (
                    <AddAssetCard
                        handleAssetsUpload={handleAssetsUpload}
                        loading={loading}
                    />
                )}
            </Box>
        </Box>
    );
}
