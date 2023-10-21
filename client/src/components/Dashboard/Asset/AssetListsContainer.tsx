"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { Asset } from "@/interfaces";
import DownloadIcon from "@mui/icons-material/Download";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import OviooDropDownWrapper from "../OviooDropDownWrapper";
import AssetList from "./AssetList";

const sortbyOptions = [
    { title: "all", path: "/dashboard/asset" },
    { title: "projects", path: "/dashboard/asset/project" },
];

export default function AssetListsContainer({
    assets,
    sortBy,
}: {
    assets: Asset[];
    sortBy: string;
}) {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };
    const handleSortBySelected = (selectedVal: string) =>
        router.push(sortbyOptions[+selectedVal].path);

    const handleDeleteAsset = () => {};

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
            <div className="flex items-center mb-3">
                <p className="text-lg">Sort by :</p>
                <OviooDropDownWrapper
                    initialVal={sortbyOptions.findIndex(
                        (option) => option.title == sortBy
                    )}
                    onSelected={handleSortBySelected}
                    className="!mx-4"
                >
                    {sortbyOptions.map((sortbyOption, i) => (
                        <MenuItem key={sortbyOption.title} value={i}>
                            {/* <Link href={sortbyOption.path}> */}
                            {sortbyOption.title}
                            {/* </Link> */}
                        </MenuItem>
                    ))}
                </OviooDropDownWrapper>
            </div>

            <AssetList
                assets={assets}
                handleDelete={handleDeleteAsset}
                readOnly
            />
        </DashBoardCard>
    );
}
