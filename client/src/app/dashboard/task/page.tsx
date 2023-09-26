import Column from "@/components/Dashboard/Task/Column";
import { TaskKanbanColors } from "@/constants/TaskKanbanColors";
import { TaskStatus } from "@/interfaces";
import "@/styles/app/unauth/home.scss";

export default function Task() {
    return (
        <div className={"bg-[#f4f7fd] h-full flex dark:bg-[#20212c] gap-6 pb-14 overflow-x-scroll"}>
            {Object.entries(TaskStatus).map(([key, value]) => (
                <Column
                    key={key}
                    title={value as TaskStatus}
                    color={TaskKanbanColors[key as keyof typeof TaskKanbanColors]}
                />
            ))}
        </div>
    );
}
