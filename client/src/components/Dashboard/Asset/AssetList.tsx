"use client";

import {
    Asset as AssetInterface,
    AssetList as AssetListInterface,
    ImgExtensionEnum,
    VideoExtensionEnum,
} from "@/interfaces";
import "@/styles/components/dashboard/asset/asset-list.scss";
import { ObjectHasVal } from "@/utils/helpers";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import { CardHeader, IconButton } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import AddAssetCard from "./AddAssetCard";
import LinkAssetCard from "./Cards/DefaultCard";
import MediaCard from "./Cards/MediaCard";

export default function AssetList({
    assetsList,
    readOnly
}: {
    assetsList: AssetListInterface[],
    readOnly?: boolean
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDownload = () => { }
    const handleDelete = () => { }

    const getAssetToRender = (asset: AssetInterface) => {
        if (
            ObjectHasVal(ImgExtensionEnum, asset.type) ||
            ObjectHasVal(VideoExtensionEnum, asset.type)
        ) {
            return (
                <MediaCard asset={asset} isVideo={ObjectHasVal(VideoExtensionEnum, asset.type)} />
            );
        }

        return <LinkAssetCard asset={asset} />;
    };

    return assetsList.map((category, index) => (
        <Box
            key={index + '-assetlist'}
            flexDirection="column"
            className="asset-list flex p-0 cursor-pointer"
        >
            {
                category.title &&
                <h4 className="text-xl capitalize mb-4">{category.title}</h4>
            }

            <Box component="ul" flexDirection="row" className="flex gap-6 flex-wrap">
                {category.assets.map((asset) => (
                    <Card component="li" key={asset.alt} className="!bg-gray-200">
                        <CardHeader
                            action={
                                <IconButton aria-label="settings" onClick={handleClick}>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            className="absolute z-[100] !p-3 right-[1px] top-[1px] !bg-transparent"
                        />
                        {getAssetToRender(asset)}
                    </Card>
                ))}

                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch',
                            },
                        }
                    }}
                >
                    <MenuItem onClick={handleDownload}>download</MenuItem>
                    <MenuItem onClick={handleDelete}>delete</MenuItem>
                </Menu>

                {!readOnly && <AddAssetCard />}
            </Box>
        </Box >
    ));
}
