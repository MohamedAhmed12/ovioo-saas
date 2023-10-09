"use client";

import DashBoardCard from "@/components/DashBoardCard";
import "@/styles/components/dashboard/project/project-card.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

const SHOW_PROJECT = gql`
    query ($id: String!) {
        showProject(id: $id) {
            id
            title
            description
        }
    }
`;

export default function ProjectDetailedCard({ id }: { id: string }) {
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
        data: project,
    } = useQuery(SHOW_PROJECT, {
        client: apolloClient,
        variables: {
            id,
        },
    });

    if (error) throw new Error(JSON.stringify(error));

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        session &&
        !graphQLloading &&
        project.showProject && (
            <DashBoardCard handleSubmit={handleSubmit} headerTitle={project.showProject.title}>
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
                            <p className="text-slate-400">{project.showProject.description}</p>
                        </div>
                    </div>
                    <div className="basis-2/12 text-end">
                        <Link
                            href={`/dashboard/task/create?project=${id}`}
                            className="new-task-btn capitalize font-bold mt-4 text-[#0ea5e9] cursor-pointer text-lg"
                        >
                            + new task
                        </Link>
                    </div>
                </div>
            </DashBoardCard>
        )
    );
}
