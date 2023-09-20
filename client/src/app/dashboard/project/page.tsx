"use client";

import AddNewProjectCard from "@/components/Dashboard/Project/AddNewProjectCard";
import AddNewProjectCardModal from "@/components/Dashboard/Project/AddNewProjectCardModal";
import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useState } from "react";

export default function Projects() {
    const [open, setOpen] = useState(false);
    const projects= [
        {
            id: 1,
            name: "first project",
            tasks: [
                {
                    title: "First task",
                    description: "",
                    status: "Todo",
                },
                {
                    title: "Second task",
                    description: "",
                    status: "Todo",
                },
            ],
        },
        {
            id: 2,
            name: "second project",
            tasks: [
                {
                    title: "First task",
                    description: "",
                    status: "Todo",
                },
                {
                    title: "Second task",
                    description: "",
                    status: "Todo",
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
                <ProjectCard project={project} key={i} actionURL={`/dashboard/project/${project.id}`} />
            ))}

            <AddNewProjectCard handleToggleModal={handleToggleModal} />
            <AddNewProjectCardModal open={open} handleToggleModal={handleToggleModal} />
        </div>
    );
}
