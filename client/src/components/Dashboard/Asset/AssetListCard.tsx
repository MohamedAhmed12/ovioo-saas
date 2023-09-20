"use client";

import DashBoardCard from "@/components/DashBoardCard";
import SortBy from "@/components/Dashboard/SortBy";
import { AssetList as AssetListInterface } from "@/interfaces";
import DownloadIcon from "@mui/icons-material/Download";
import { FormEvent } from "react";
import AssetList from "./AssetList";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";

const sortby = ["categories", "projects"];

export default function AssetListCard({ assetsList }: { assetsList: AssetListInterface[] }) {
    // const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };
    const onSelected = (e: SelectChangeEvent<HTMLFormElement>) => {
        console.log(typeof e?.target?.value);

        // if (sortby[parseInt(e?.target?.value || 0)] === "projects") {
        //
        // }
    };

    return (
        <DashBoardCard
            handleSubmit={handleSubmit}
            headerTitle="assets"
            action={
                <button className="dashboard__link bg-transparent shadow-none hover:bg-transparent hover:shadow-none font-semibold pt-3 pr-4">
                    <DownloadIcon />
                    Download All Media
                </button>
            }
        >
            <SortBy onSelected={onSelected} options={sortby} />
            <AssetList assetsList={assetsList} />
        </DashBoardCard>
    );
}
