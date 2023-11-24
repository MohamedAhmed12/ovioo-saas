"use client";

import Column from "@/components/Dashboard/Task/Column";
import { TaskKanbanColors } from "@/constants/TaskKanbanColors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
    DesignerTaskStatus,
    TaskStatus
} from "@/interfaces";
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
    const isDesigner = useAppSelector((state) => state.userReducer.isDesigner);
    const dispatch = useAppDispatch();
    const { data: session } = useSession({ required: true });
    const client = getClient(session);
    const {
        loading: graphQLloading,
        error,
        data,
    } = useQuery(LIST_TASKS, { client, fetchPolicy: "no-cache" });

    if (error) throw new Error(JSON.stringify(error));

    const getTaskStatuses = () => {
        if (isDesigner) {
            return Object.keys(DesignerTaskStatus);
        }

        return Object.keys(TaskStatus);
    };

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
                    "bg-[#f4f7fd] h-full flex dark:bg-[#20212c] gap-6 pb-14 overflow-x-auto"
                }
            >
                {getTaskStatuses().map((key: any) => {
                    const taskStatusKey = key as keyof typeof TaskStatus;

                    return (
                        <Column
                            key={key}
                            title={TaskStatus[taskStatusKey]}
                            color={TaskKanbanColors[taskStatusKey]}
                            tasks={tasks[TaskStatus[taskStatusKey]]}
                        />
                    );
                })}
            </div>
        )
    );
}
