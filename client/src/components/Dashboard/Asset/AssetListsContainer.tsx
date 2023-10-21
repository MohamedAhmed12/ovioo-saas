"use client";

import DashBoardCard from "@/components/DashBoardCard";
import OviooDropDown from "@/components/Dashboard/OviooDropDown";
import { Asset } from "@/interfaces";
import { setTasks } from "@/store/features/board";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import DownloadIcon from "@mui/icons-material/Download";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import AssetList from "./AssetList";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const LIST_ASSETS = gql`
    query listAssets {
        listAssets {
            id
            src
            alt
            type
            project {
                id
                title
            }
        }
    }
`;
const sortbyOptions = [
    { title: "all", path: "/dashboard/asset" },
    { title: "projects", path: "/dashboard/asset/project" },
];

export default function AssetListsContainer({
    // assetsList,
    sortBy,
}: {
    // assetsList: Asset[];
    sortBy: string;
}) {
    const router = useRouter();
    // const initialVal = sortbyOptions.findIndex((elm) => elm.title == sortBy);

    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.boardReducer.tasks);
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_ASSETS, { client, fetchPolicy: "no-cache" });

    if (error) throw new Error();

    // useEffect(() => {
    //     console.log(tasks.length);

    //     if (!graphQLloading && data?.listTasks && tasks.length == 0) {
    //         dispatch(setTasks(data.listTasks));
    //     }
    // }, [graphQLloading, data, data?.listTasks, dispatch, tasks]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };
    const handleSortBySelected = (selectedVal: string) =>
        router.push(sortbyOptions[+selectedVal].path);
    const handleDeleteAsset = () => {};

    return (
        !graphQLloading &&
        !error &&
        data.listAssets && (
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
                    <OviooDropDown
                        onSelected={handleSortBySelected}
                        options={sortbyOptions.map((option) => option.title)}
                        initialVal="all"
                        className="!mx-4"
                    />
                </div>
                {/* sssss{initialVal} */}
                {/* {Object.values(tasks).map((task) => (
                <AssetList
                    key={task.id}
                    task={task}
                    handleDelete={handleDeleteAsset}
                    readOnly
                />
            ))} */}
                {/* {JSON.stringify(data.listAssets)} */}
                <AssetList
                    // key={asset.id}
                    assets={data.listAssets}
                    handleDelete={handleDeleteAsset}
                    readOnly
                />
            </DashBoardCard>
        )
    );
}
