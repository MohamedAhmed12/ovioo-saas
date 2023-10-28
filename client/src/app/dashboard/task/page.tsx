"use client";

import Column from "@/components/Dashboard/Task/Column";
import { TaskKanbanColors } from "@/constants/TaskKanbanColors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TaskStatus } from "@/interfaces";
import { setTasks } from "@/store/features/board";
import "@/styles/app/unauth/home.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const LIST_TASKS = gql`
    query ListTasks {
        listTasks {
            id
            title
            status
        }
    }
`;

export default function Task() {
    const tasks = useAppSelector((state) => state.boardReducer.tasks);
    const dispatch = useAppDispatch();
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_TASKS, { client, fetchPolicy: "no-cache" });

    if (error) throw new Error(JSON.stringify(error));

    useEffect(() => {
        if (!graphQLloading && data?.listTasks) {
            dispatch(setTasks(data.listTasks));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphQLloading, data, data?.listTasks]);

    return (
        session &&
        !graphQLloading &&
        !error &&
        data?.listTasks &&
        tasks && (
            <div
                className={
                    "bg-[#f4f7fd] h-full flex dark:bg-[#20212c] gap-6 pb-14 overflow-x-scroll"
                }
            >
                {Object.keys(TaskStatus).map((key: any) => (
                    <Column
                        key={key}
                        title={TaskStatus[key as keyof typeof TaskStatus]}
                        color={TaskKanbanColors[key as keyof typeof TaskStatus]}
                        tasks={tasks[key]}
                    />
                ))}
            </div>
        )
    );
}
