"use client";

import AddNewProjectCard from "@/components/Dashboard/Project/AddNewProjectCard";
import AddNewProjectCardModal from "@/components/Dashboard/Project/AddNewProjectCardModal";
import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { TaskStatus } from "@/interfaces";
import { useState } from "react";

export default function Projects() {
    const [open, setOpen] = useState(false);
    const projects = [
        {
            id: 1,
            name: "first project",
            tasks: [
                {
                    id: 1,
                    title: "First task",
                    description: "",
                    status: TaskStatus.InQueue,
                },
                {
                    id: 2,
                    title: "Second task",
                    description: "",
                    status: TaskStatus.InQueue,
                },
            ],
        },
        {
            id: 2,
            name: "second project",
            tasks: [
                {
                    id: 1,
                    title: "First task",
                    description: "",
                    status: TaskStatus.InQueue,
                },
                {
                    id: 2,
                    title: "Second task",
                    description: "",
                    status: TaskStatus.InQueue,
                },
            ],
        },
    ];

    const handleToggleModal = () => {
        setOpen((prevState) => (prevState = !prevState));
    };

    return (
        <div className="flex justify-start flex-wrap">
            {projects.map((project, i) => (
                <ProjectCard
                    project={project}
                    key={i}
                    actionURL={`/dashboard/project/${project.id}`}
                />
            ))}

            <AddNewProjectCard handleToggleModal={handleToggleModal} />
            <AddNewProjectCardModal open={open} handleToggleModal={handleToggleModal} />
        </div>
    );
}
