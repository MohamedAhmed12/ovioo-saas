"use client";

import {
    Asset as AssetInterface,
    AssetList as AssetListInterface,
    ImgExtensionEnum,
    VideoExtensionEnum,
} from "@/interfaces";
import "@/styles/components/dashboard/asset/asset-list.scss";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import MediaCard from "./Cards/MediaCard";
import LinkAssetCard from "./Cards/DefaultCard";
import VideoAssetCard from "./Cards/VideoAssetCard";
import DefaultAssetCard from "./Cards/DefaultAssetCard";
import { ObjectHasVal } from "@/utils/helpers";

export default function AssetList({ assetsList }: { assetsList: AssetListInterface[] }) {
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

    return assetsList.map((category) => (
        <Box
            key={category.title}
            flexDirection="column"
            className="asset-list flex p-0 mt-5 cursor-pointer"
        >
            <h4 className="text-xl capitalize mb-4">{category.title}</h4>

            <Box component="ul" flexDirection="row" className="flex gap-6 flex-wrap">
                {category.assets.map((asset) => (
                    <Card component="li" key={asset.alt} className="!bg-gray-200">
                        {getAssetToRender(asset)}
                    </Card>
                ))}
            </Box>
        </Box>
    ));
}
