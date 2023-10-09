import ProjectDetailedCard from "@/components/Dashboard/Project/ProjectDetailedCard";
import ProjectTasksTable from "@/components/Dashboard/Project/ProjectTasksTable";

export default function ViewProject({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="view-project">
            <ProjectDetailedCard id={id} />
            <ProjectTasksTable />
        </div>
    );
}
