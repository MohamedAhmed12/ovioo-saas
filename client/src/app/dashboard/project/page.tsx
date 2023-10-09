"use client";

import AddNewProjectCard from "@/components/Dashboard/Project/AddNewProjectCard";
import AddNewProjectCardModal from "@/components/Dashboard/Project/AddNewProjectCardModal";
import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { TaskStatus } from "@/interfaces";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Project as ProjectInterface } from "@/interfaces";

const FETCH_PROFILE = gql`
    query {
        listProjects {
            id
            title
            description
        }
    }
`;

export default function Projects() {
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/login");
        },
    });

    const apolloClient = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data: projects,
    } = useQuery(FETCH_PROFILE, { client: apolloClient });

    if (error) throw new Error(JSON.stringify(error));

    const handleToggleModal = () => {
        setOpen((prevState) => (prevState = !prevState));
    };

    return (
        !graphQLloading &&
        projects && (
            <div className="flex justify-start flex-wrap">
                {projects.listProjects.map((project: ProjectInterface, i: number) => (
                    <ProjectCard
                        project={project}
                        key={project.id}
                        actionURL={`/dashboard/project/${project.id}`}
                    />
                ))}

                <AddNewProjectCard handleToggleModal={handleToggleModal} />
                <AddNewProjectCardModal open={open} handleToggleModal={handleToggleModal} />
            </div>
        )
    );
}
