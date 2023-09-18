"use client";

import DashBoardCard from "@/components/DashBoardCard";
import ProjectTasksTable from "@/components/Dashboard/Project/ProjectTasksTable";
import Image from "next/image";
import Link from "next/link";

const project = {
    id: 1,
    name: "first project",
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugiat aspernatur dolore consectetur officia labore, optio aperiam expedita. Expedita in dolor excepturi iure? Facilis exercitationem deleniti at, ea sunt harum.",
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
};

export default function ViewProject() {
    const handleSubmit = () => {};

    return (
        <div className="view-project">
            <DashBoardCard handleSubmit={handleSubmit} headerTitle={project.name}>
                <div className="flex flex-col lg:flex-row justify-between items-center w-full p-6">
                    <div className="flex basis-10/12">
                        <Image
                            src="https://picsum.photos/id/12/400/400"
                            width="100"
                            height="100"
                            alt="profile"
                            className="rounded-full max-w-full"
                        />
                        <div className="description-wrapper px-8">
                            <h5 className="text-xl capitalize mb-3">description</h5>
                            <p className="text-slate-400">{project.description}</p>
                        </div>
                    </div>
                    <div className="basis-2/12 text-end">
                        <Link
                            href={`/dashboard/task/create?project=${project.id}`}
                            className="new-task-btn capitalize font-bold mt-4 text-[#0ea5e9] cursor-pointer text-lg"
                        >
                            + new task
                        </Link>
                    </div>
                </div>
            </DashBoardCard>

            <ProjectTasksTable />
        </div>
    );
}
