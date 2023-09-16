"use client";

import AddNewProjectCard from "@/components/Dashboard/Project/AddNewProjectCard";
import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useState } from "react";

export default function Projects() {
    const [projects, setProjects] = useState([
        {
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
    ]);

    const handleOnAddProject = (e) => {
        console.log(e);
    };
    return (
        <div className="flex justify-start">
            {projects.map((project, i) => (
                <ProjectCard project={project} key={i} />
            ))}

            <AddNewProjectCard />
        </div>
    );
}
