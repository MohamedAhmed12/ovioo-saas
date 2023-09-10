"use client";

import Column from "@/components/Dashboard/Task/Column";
import { useAppSelector } from "@/hooks/redux";
import { ColumnInterface } from "@/interfaces";
import "@/styles/app/unauth/home.scss";

export default function Task() {
    const columns = useAppSelector((state) => state.boardReducer.columns);

    return (
        <div className={"bg-[#f4f7fd] h-full flex dark:bg-[#20212c] gap-6 "}>
            {columns.map((col: ColumnInterface, index: number) => (
                <Column key={index} colIndex={index} />
            ))}
        </div>
    );
}
