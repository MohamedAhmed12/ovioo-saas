"use client";

import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useState } from "react";
import "@/styles/app/dashboard/asset.scss";
import Link from "next/link";

export default function AssetProjects() {
    const projects = [
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

    return (
        <div className="asset-container flex justify-start flex-wrap">
            {projects.map((project, i) => (
                <ProjectCard
                    key={i}
                    project={project}
                    readOnly
                    actionURL={`/dashboard/asset/project/${project.id}`}
                />
            ))}
        </div>
    );
}
