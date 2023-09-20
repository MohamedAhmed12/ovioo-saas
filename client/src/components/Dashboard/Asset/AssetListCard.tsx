"use client";

import DashBoardCard from "@/components/DashBoardCard";
import SortBy from "@/components/Dashboard/SortBy";
import { AssetList as AssetListInterface } from "@/interfaces";
import DownloadIcon from "@mui/icons-material/Download";
import { FormEvent } from "react";
import AssetList from "./AssetList";
import { SelectChangeEvent } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const sortbyOptions = [
    { title: "categories", path: "/dashboard/asset" },
    { title: "projects", path: "/dashboard/asset/project/[id]" },
];

export default function AssetListCard({ assetsList }: { assetsList: AssetListInterface[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const initialVal = sortbyOptions.findIndex((elm) => elm.path == pathname);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };
    const handleSortBySelected = (selectedVal: string) => {
        console.log(sortbyOptions[+selectedVal].path);
        
        router.push(sortbyOptions[+selectedVal].path);
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
            <SortBy
                onSelected={handleSortBySelected}
                options={sortbyOptions}
                initialVal={initialVal}
            />
            <AssetList assetsList={assetsList} />
        </DashBoardCard>
    );
}
