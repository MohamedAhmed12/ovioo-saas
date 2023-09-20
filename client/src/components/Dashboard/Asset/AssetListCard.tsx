"use client";

import DashBoardCard from "@/components/DashBoardCard";
import SortBy from "@/components/Dashboard/SortBy";
import { AssetList as AssetListInterface } from "@/interfaces";
import DownloadIcon from "@mui/icons-material/Download";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent } from "react";
import AssetList from "./AssetList";

const sortbyOptions = [
    { title: "categories", path: "/dashboard/asset" },
    { title: "projects", path: "/dashboard/asset/project" },
];

export default function AssetListCard({
    assetsList,
    sortBy,
}: {
    assetsList: AssetListInterface[];
    sortBy: string;
}) {
    const router = useRouter();
    const initialVal = sortbyOptions.findIndex((elm) => elm.title == sortBy);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };
    const handleSortBySelected = (selectedVal: string) =>
        router.push(sortbyOptions[+selectedVal].path);

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
