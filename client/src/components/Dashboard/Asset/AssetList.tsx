"use client";

import {
    Asset as AssetInterface,
    ImgExtensionEnum,
    TaskInterface,
    VideoExtensionEnum,
    s3PathInterface,
} from "@/interfaces";
import { setTaskAssets } from "@/store/features/task";
import "@/styles/components/dashboard/asset/asset-list.scss";
import { getClient } from "@/utils/getClient";
import { ObjectHasVal, uploadFiles } from "@/utils/helpers";
import { gql, useMutation } from "@apollo/client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import { CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AddAssetCard from "./AddAssetCard";
import LinkAssetCard from "./Cards/DefaultCard";
import MediaCard from "./Cards/MediaCard";

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
const DOWNLOAD_ASSET = gql`
    mutation Mutation($alt: String!) {
        downloadAsset(alt: $alt)
    }
`;

export default function AssetList({
    task,
    readOnly,
    title,
    handleDelete,
}: {
    task: TaskInterface;
    readOnly?: boolean;
    title?: string;
    handleDelete: (asset: AssetInterface) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useDispatch();
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const [createAssets] = useMutation(CREATE_ASSET, { client });
    const [downloadAsset] = useMutation(DOWNLOAD_ASSET, { client });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAssetsUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
        }

        setLoading(false);
    };
    const handleDownload = async (alt: string) => {
        try {
            const { data } = await downloadAsset({
                variables: { alt },
            });

            const a = document.createElement("a");
            a.href = data.downloadAsset;
            a.download = alt;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e: any) {
            toast.error("Something went wrong!");
        }

        setAnchorEl(null);
    };

    const getAssetToRender = (asset: AssetInterface) => {
        if (
            ObjectHasVal(ImgExtensionEnum, asset.type) ||
            ObjectHasVal(VideoExtensionEnum, asset.type)
        ) {
            return (
                <MediaCard
                    asset={asset}
                    isVideo={ObjectHasVal(VideoExtensionEnum, asset.type)}
                />
            );
        }

        return <LinkAssetCard asset={asset} />;
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
                {task.assets.map((asset) => (
                    <>
                        <Card
                            key={`card-${asset.id}`}
                            component="li"
                            className="!bg-gray-200"
                        >
                            <CardHeader
                                action={
                                    <IconButton
                                        aria-label="settings"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                className="absolute z-[100] !p-3 right-[1px] top-[1px] !bg-transparent"
                            />
                            {getAssetToRender(asset)}
                        </Card>
                        <Menu
                            key={`menu-${asset.id}`}
                            id="long-menu"
                            MenuListProps={{
                                "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            slotProps={{
                                paper: {
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: "20ch",
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleDownload(asset.alt)}>
                                download
                            </MenuItem>
                            <MenuItem onClick={() => handleDelete(asset)}>
                                delete
                            </MenuItem>
                        </Menu>
                    </>
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
