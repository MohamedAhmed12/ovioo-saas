import ProjectDetailedCard from "@/components/Dashboard/Project/ProjectDetailedCard";
import ProjectTasksTable from "@/components/Dashboard/Project/ProjectTasksTable";

export default function ViewProject() {
    return (
        <div className="view-project">
            <ProjectDetailedCard />
            <ProjectTasksTable />
        </div>
    );
}
