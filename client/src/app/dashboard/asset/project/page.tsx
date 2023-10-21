"use client";

import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setProjects } from "@/store/features/project";
import "@/styles/app/dashboard/asset.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const LIST_PROJECTS = gql`
    query {
        listProjects {
            id
            title
            description
        }
    }
`;

export default function AssetProjects() {
    const dispatch = useAppDispatch();
    const projects = useAppSelector((state) => state.projectReducer.projects);
    const { data: session, status } = useSession({
        required: true,
    });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_PROJECTS, { client });

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!graphQLloading && data?.listProjects && projects.length == 0) {
            dispatch(setProjects(data.listProjects));
        }
    }, [graphQLloading, data, dispatch, projects]);

    return (
        session &&
        projects && (
            <div className="asset-container flex justify-start flex-wrap">
                {projects.map((project: any, i) => (
                    <ProjectCard
                        key={i}
                        project={project}
                        readOnly
                        client={client}
                        actionURL={`/dashboard/asset/project/${project.id}`}
                    />
                ))}
            </div>
        )
    );
}
