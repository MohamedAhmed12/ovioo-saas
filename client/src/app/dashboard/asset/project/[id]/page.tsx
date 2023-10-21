"use client";

import AssetListsContainer from "@/components/Dashboard/Asset/AssetListsContainer";
import ProjectDetailedCard from "@/components/Dashboard/Project/ProjectDetailedCard";
import "@/styles/app/dashboard/asset.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
    const [assets, setAssets] = useState([]);
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

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!graphQLloading && data.listAssets && assets.length == 0) {
            setAssets(data.listAssets);
        }
    }, [graphQLloading, data, assets.length]);

    return (
        id &&
        session &&
        !graphQLloading &&
        !error &&
        data.listAssets && (
            <div className="asset-container flex justify-start flex-wrap flex-col gap-14">
                <ProjectDetailedCard id={id} />
                <AssetListsContainer
                    assets={assets}
                    setAssets={setAssets}
                    sortBy="projects"
                    client={client}
                />
            </div>
        )
    );
}
