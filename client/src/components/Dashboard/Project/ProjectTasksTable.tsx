"use client";

import { TaskStatus } from "@/interfaces";
import "@/styles/components/dashboard/project/project-tasks-table.scss";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import OviooTable from "../Layout/OviooTable";

const taskStatuses: TaskStatus[] = Object.values(TaskStatus);
const headers = ["Designer", "Tasks", "Status", "Updated"];
const rows = [
    {
        designer: "John Doe",
        task: "First Task",
        status: TaskStatus.IN_QUEUED,
        updated: new Date().toDateString(),
    },
];

export default function ProjectTasksTable() {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="tasks-wrapper">
            <Box sx={{ width: "100%" }}>
                <Tabs
                    onChange={handleChange}
                    value={value}
                    aria-label="Tabs where each tab needs to be selected manually"
                >
                    {taskStatuses.map((status) => (
                        <Tab key={status} label={status} className="dark:text-white " />
                    ))}
                </Tabs>

                <OviooTable headers={headers} rows={rows} />
            </Box>
        </div>
    );
}
