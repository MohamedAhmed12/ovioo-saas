"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { Asset, Asset as AssetInterface } from "@/interfaces";
import { delay } from "@/utils/helpers";
import { ApolloClient, gql, useMutation } from "@apollo/client";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/joy";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import OviooDropDownWrapper from "../OviooDropDownWrapper";
import AssetList from "./AssetList";

const DOWNLOAD_ASSET = gql`
    mutation Mutation($alt: String!) {
        downloadAsset(alt: $alt)
    }
`;
const DELETE_ASSET = gql`
    mutation Mutation($asset: DeleteAssetDto!) {
        deleteAsset(asset: $asset)
    }
`;
const sortbyOptions = [
    { title: "all", path: "/dashboard/asset" },
    { title: "projects", path: "/dashboard/asset/project" },
];

export default function AssetListsContainer({
    assets,
    sortBy,
    client,
    setAssets,
}: {
    assets: Asset[];
    sortBy: string;
    client: ApolloClient<any> | undefined;
    setAssets: Dispatch<SetStateAction<never[]>>;
}) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const [downloadAsset] = useMutation(DOWNLOAD_ASSET, { client });
    const [deleteAsset] = useMutation(DELETE_ASSET, { client });

    const handleDownload = async () => {
        setLoading(true);

        try {
            for (const asset of assets) {
                const { data } = await downloadAsset({
                    variables: { alt: asset.alt },
                });
                console.log(data.downloadAsset);

                // window.open(data.downloadAsset);
                // return undefined;

                const a = document.createElement("a");
                a.href = data.downloadAsset;
                a.download = asset.alt;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                delay(500);
                // setTimeout(()=>{
                // },500)
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }

        setLoading(false);
    };

    const handleSortBySelected = (selectedVal: string) =>
        router.push(sortbyOptions[+selectedVal].path);

    const handleDeleteAsset = async ({
        id,
        alt,
    }: {
        id: string;
        alt: string;
    }) => {
        try {
            await deleteAsset({
                variables: {
                    asset: {
                        id,
                        alt,
                    },
                },
            });

            setAssets((prevState) =>
                prevState.filter((asset: AssetInterface) => asset?.id != id)
            );
            toast.success("Deleted successfully");
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };
    return (
        <DashBoardCard
            headerTitle="assets"
            action={
                <Button
                    loading={loading}
                    className="dashboard__link !text-base !bg-transparent shadow-none hover:bg-transparent hover:shadow-none font-semibold pt-3 pr-4"
                    onClick={handleDownload}
                >
                    <DownloadIcon />
                    Download All Media
                </Button>
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
