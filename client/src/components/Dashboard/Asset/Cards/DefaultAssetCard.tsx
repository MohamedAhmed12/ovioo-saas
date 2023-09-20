"use client";

import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/components/dashboard/asset/asset-list.scss";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import Image from "next/image";

export default function DefaultAssetCard({ asset }: { asset: AssetInterface }) {
    return (
        <>
            <CardCover className="bg-slate-200">
                <span className="MuiImageBackdrop-root" />
                <div className="flex h-full justify-center items-center text-4xl font-semibold text-gray-500 uppercase">
                    {asset.type}
                </div>
            </CardCover>

            <CardContent sx={{ justifyContent: "flex-end", padding: "8px 16px" }}>
                <Typography level="body-lg" fontWeight="lg" textColor="#fff">
                    {asset.alt}
                </Typography>
            </CardContent>
        </>
    );
}
