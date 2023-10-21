"use client";

import AssetListsContainer from "@/components/Dashboard/Asset/AssetListsContainer";
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

export default function Asset() {
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_ASSETS, { client, fetchPolicy: "no-cache" });

    if (error) throw new Error();

    return (
        session &&
        !graphQLloading &&
        !error &&
        data.listAssets && (
            <div className="asset-container flex justify-start flex-wrap">
                <AssetListsContainer sortBy="all" assets={data.listAssets} />
            </div>
        )
    );
}
