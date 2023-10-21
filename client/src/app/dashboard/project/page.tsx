"use client";

import AddNewProjectCard from "@/components/Dashboard/Project/AddNewProjectCard";
import AddNewProjectCardModal from "@/components/Dashboard/Project/AddNewProjectCardModal";
import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Project as ProjectInterface } from "@/interfaces";
import { setProjects } from "@/store/features/project";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LIST_PROJECTS = gql`
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
    const [projectToEdit, setProjectToEdit] = useState({});

    const projects = useAppSelector((state) => state.projectReducer.projects);
    const dispatch = useAppDispatch();
    const { data: session } = useSession({ required: true });
    const apolloClient = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_PROJECTS, { client: apolloClient });

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!graphQLloading && data?.listProjects && projects.length == 0) {
            dispatch(setProjects(data.listProjects));
        }
    }, [graphQLloading, data, dispatch, projects]);

    const handleEditProject = (project: ProjectInterface) => {
        setProjectToEdit(project);
        handleToggleModal();
    };
    const handleToggleModal = () => {
        setOpen((prevState) => (prevState = !prevState));
    };

    return (
        session &&
        projects && (
            <div className="flex justify-start flex-wrap">
                {projects.map((project: ProjectInterface, i: number) => (
                    <ProjectCard
                        project={project}
                        key={project.id}
                        actionURL={`/dashboard/project/${project.id}`}
                        client={apolloClient}
                        onEditProject={handleEditProject}
                    />
                ))}

                <AddNewProjectCard handleToggleModal={handleToggleModal} />
                <AddNewProjectCardModal
                    open={open}
                    handleToggleModal={handleToggleModal}
                    client={apolloClient}
                    projectToEdit={projectToEdit}
                />
            </div>
        )
    );
}
