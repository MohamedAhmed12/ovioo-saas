"use client";

import AssetListsContainer from "@/components/Dashboard/Asset/AssetListsContainer";
import ProjectDetailedCard from "@/components/Dashboard/Project/ProjectDetailedCard";
import "@/styles/app/dashboard/asset.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

const LIST_ASSETS = gql`
    query Query($id: String) {
        listAssets(id: $id) {
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

export default function ViewAssetProject({
    params: { id },
}: {
    params: { id: string };
}) {
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_ASSETS, {
        variables: { id },
        client,
        fetchPolicy: "no-cache",
    });

    if (error) throw new Error();

    return (
        id &&
        session &&
        !graphQLloading &&
        !error &&
        data.listAssets && (
            <div className="asset-container flex justify-start flex-wrap flex-col gap-14">
                <ProjectDetailedCard id={id} />
                <AssetListsContainer
                    assets={data.listAssets}
                    sortBy="projects"
                />
            </div>
        )
    );
}
