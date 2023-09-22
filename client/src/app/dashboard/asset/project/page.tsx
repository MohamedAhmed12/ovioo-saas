"use client";

import ProjectCard from "@/components/Dashboard/Project/ProjectCard";
import { useState } from "react";
import "@/styles/app/dashboard/asset.scss";
import Link from "next/link";
import { TaskInterface, TaskStatus } from "@/interfaces";

export default function AssetProjects() {
    const projects: { id: number; name: string; tasks: TaskInterface[] }[] = [
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

    return (
        <div className="asset-container flex justify-start flex-wrap">
            {projects.map((project: any, i) => (
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
