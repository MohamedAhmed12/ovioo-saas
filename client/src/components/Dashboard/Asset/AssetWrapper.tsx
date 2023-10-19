import {
    Asset as AssetInterface,
    ImgExtensionEnum,
    VideoExtensionEnum,
} from "@/interfaces";
import "@/styles/components/dashboard/asset/asset-list.scss";
import { ObjectHasVal } from "@/utils/helpers";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/joy/Card";
import { CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import LinkAssetCard from "./Cards/DefaultCard";
import MediaCard from "./Cards/MediaCard";

const DOWNLOAD_ASSET = gql`
    mutation Mutation($alt: String!) {
        downloadAsset(alt: $alt)
    }
`;

export default function AssetWrapper({
    asset,
    handleDelete,
    client,
}: {
    asset: AssetInterface;
    handleDelete: (asset: AssetInterface) => void;
    client: ApolloClient<any> | undefined;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [downloadAsset] = useMutation(DOWNLOAD_ASSET, { client });

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
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

    return (
        <Card component="li" className="!bg-gray-200">
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={handleOpenMenu}>
                        <MoreVertIcon />
                    </IconButton>
                }
                className="absolute z-[100] !p-3 right-[1px] top-[1px] !bg-transparent"
            />

            {getAssetToRender(asset)}

            <Menu
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
                <MenuItem onClick={() => handleDelete(asset)}>delete</MenuItem>
            </Menu>
        </Card>
    );
}
